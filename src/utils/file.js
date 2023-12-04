import { Asset } from 'expo-asset';
import { readAsStringAsync } from 'expo-file-system';

const read_bible_krv_file = async () => {
  const [{ localUri }] = await Asset.loadAsync(
    require('../../assets/bible/krv.txt'),
  );
  const bibleKrvContent = await readAsStringAsync(localUri);
  const lines = bibleKrvContent.split('\n');
  const list = [];
  lines.forEach(line => {
    const tokens = line.split(' ');
    const [idx, book, title_abbr, title, chapter, verse, ...words] = tokens;
    list.push({
      idx,
      book,
      title_abbr,
      title,
      chapter,
      verse,
      text: words.join(' '),
    });
  });

  return list;
};

export { read_bible_krv_file };
