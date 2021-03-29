class Article {
  constructor(
    id,
    imageUrl,
    judul,
    hashtag,
    idCategory,
    partOne,
    partTwo,
    partThree,
    time,
    idPenulis,
    countView,
  ) {
    this.id = id;
    this.imageUrl = imageUrl;
    this.judul = judul;
    this.hashtag = hashtag;
    this.idCategory = idCategory;
    this.partOne = partOne;
    this.partTwo = partTwo;
    this.partThree = partThree;
    this.time = time;
    this.idPenulis = idPenulis;
    this.countView = countView;
  }
}

export default Article;
