import * as SQLITE from 'expo-sqlite';
import { read_bible_krv_file } from './file';

const DB_NAME = 'aha_bible';
const TABLE_KRV = 'bible_krv';

const initDB = () => {
  const db = SQLITE.openDatabase(DB_NAME);

  db.exec([{ sql: 'PRAGMA foreign_keys = ON;', args: [] }], false, () => {});
  return db;
};

const db = initDB();

const create_bible_krv_query = `
    CREATE TABLE IF NOT EXISTS ${TABLE_KRV}
    (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        book TEXT NOT NULL,
        idx INTEGER NOT NULL UNIQUE,
        title_abbr TEXT NOT NULL,
        title TEXT NOT NULL,
        chapter INTEGER NOT NULL,
        chapter_idx INTEGER NOT NULL,
        verse INTEGER NOT NULL,
        text TEXT NOT NULL
    );
`;

const init_bible_krv = () => {
  db.transaction(
    tx => {
      tx.executeSql(create_bible_krv_query);
    },
    err => {
      console.error(err);
    },
    () => {
      db.transaction(tx => {
        tx.executeSql(
          `SELECT idx FROM ${TABLE_KRV};`,
          [],
          (_, result) => {
            length = result.rows.length;
            console.log(`bible krv total data=${length}`);
            if (length === 0) {
              insert_bible_krv();
            } else if (length < 31101) {
              tx.executeSql(`DROP TABLE ${TABLE_KRV};`, [], () => {
                console.log(`DROP TABLE ${TABLE_KRV} succeeded.`);
                tx.executeSql(create_bible_krv_query, [], () => {
                  insert_bible_krv();
                });
              });
            } else {
              console.log('bible_krv data already exists.');
            }
          },
          err => {
            console.error(err);
          },
        );
      });
    },
  );
};

const insert_bible_krv = () => {
  read_bible_krv_file()
    .then(contents => {
      let prev_chapter = '';
      let chapter_idx = -1;
      values_list = [];

      contents.forEach(
        ({ idx, book, title_abbr, title, chapter, verse, text }) => {
          chapter_expr = `${title_abbr} ${chapter}`;
          if (chapter_expr !== prev_chapter) {
            chapter_idx++;
            prev_chapter = chapter_expr;
          }
          values_list.push(
            `(${idx}, '${book}', '${title}', '${title_abbr}', ${chapter}, ${chapter_idx}, ${verse}, '${text}')`,
          );
        },
      );

      db.transaction(tx => {
        tx.executeSql(
          `
              INSERT INTO ${TABLE_KRV}
              (idx, book, title, title_abbr, chapter, chapter_idx, verse, text)
              VALUES ${values_list.join(',')}
            `,
          [],
          (trans, result) => {
            console.log('Insert Succeeded!');
          },
        );
      });
    })
    .catch(err => {
      console.error(err);
    });
};

const readBibleKrvByChapterIdx = (chapterIdx, setPage) => {
  db.transaction(
    tx => {
      tx.executeSql(
        `SELECT * FROM ${TABLE_KRV} WHERE chapter_idx=${chapterIdx};`,
        [],
        (_, result) => {
          const title = result.rows._array[0].title;
          const chapter = result.rows._array[0].chapter;
          const verses = result.rows._array;
          setPage(chapterIdx, title, chapter, verses);
        },
        err => {
          console.log(err);
        },
      );
    },
    err => {
      console.error(err);
    },
    () => {},
  );
};

export { init_bible_krv, readBibleKrvByChapterIdx };
