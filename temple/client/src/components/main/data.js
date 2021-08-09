//사이트 메뉴
export const links = [
  {
    id: 1,
    text: "Home",
    url: "#home",
    active: true,
  },
  {
    id: 2,
    text: "Portfolio",
    url: "#portfolio",
    active: false,
  },
  {
    id: 3,
    text: "About",
    url: "#about",
    active: false,
  },
  {
    id: 4,
    text: "Skills",
    url: "#skills",
    active: false,
  },
];

//포트폴리오
export const portfolioLinks = [
  {
    id: 1,
    title: "Movie",
    subTitle: "(영화사이트)",
    text: "Movie는 영화사이트로 영화소개, 관심영화 등의 기능이 있는 사이트입니다. 리액트를 주로 이용해서 만들었습니다.",
    url: "#portfolio1",
    src: "pexels-adrien-olichon-2387532.jpg",
    alt: "portfolio1 image",
    skills: ["GitHub", "React", "Javasctipt"],
    gitHubUrl: "https://github.com/kyoungjin2310",
    active: true,
  },
  {
    id: 2,
    title: "portfolio2",
    subTitle: "(쇼핑몰사이트)",
    text: "portfolio2는 쇼핑몰 사이트로, 옷 상세보기, 카트, 결제 기능이 있는 사이트입니다. 리액트를 주로 이용해서 만들었습니다.",
    url: "#portfolio2",
    src: "bernard-hermant-J0mCeeJh0nc-unsplash.jpg",
    alt: "portfolio2 image",
    skills: ["GitHub", "React", "Javasctipt"],
    gitHubUrl: "https://github.com/kyoungjin2310",
    active: false,
  },
];

//경력
export const careerList = [
  {
    name: "삼성서울병원 의학정보시스템",
    details: "메인, 서브 퍼블리싱 (반응형)",
    detailsDate: "2018/10~2019/01",
  },
  {
    name: "서강대학교 도서관 신규 홈페이지",
    details: "메인, 서브 퍼블리싱 (반응형)",
    detailsDate: "2019/07~2019/11",
  },
  {
    name: "이천시립도서관 통합도서관",
    details: "메인, 서브 퍼블리싱 (반응형)",
    detailsDate: "2019/10~2019/12",
  },
  {
    name: "한화종합연구소 기술자료 관리 홈페이지",
    details: "메인, 서브 퍼블리싱 (반응형)",
    detailsDate: "2019/10~2019/12",
  },
  {
    name: "전남도립대학교 전자도서관",
    details: "메인, 서브 퍼블리싱 (반응형)",
    detailsDate: "2019/09~2019/10",
  },
  {
    name: "한국노동연구원 통합전자 도서관",
    details: "메인, 서브 퍼블리싱 (반응형)",
    detailsDate: "2019/08~2019/09",
  },
  {
    name: "이화여자대학교 도서관 독서 프로파일링",
    details: "독서 프로파일링 페이지 퍼블리싱",
    detailsDate: "2019/11~2019/12",
  },
  {
    name: "인천연구원 전자도서관",
    details: "메인, 서브 퍼블리싱 (반응형)",
    detailsDate: "2019/03~2019/04",
  },
  {
    name: "선문대 중앙도서관 홈페이지 개편",
    details: "메인, 서브 퍼블리싱 (반응형)",
    detailsDate: "2019/01~2019/03",
  },
  {
    name: "LG화학 전자도서관 시스템",
    details: "모바일 도서관 메인 퍼블리싱",
    detailsDate: "2018/12~2019/01",
  },
  {
    name: "한국뇌연구원 전자도서관이용자서비스",
    details: "메인, 서브 퍼블리싱 (반응형)",
    detailsDate: "2018/11~2019/01",
  },
  {
    name: "한국예술종합학교 반응형 전자도서관",
    details: "메인 수정, 서브 퍼블리싱 (반응형)",
    detailsDate: "2018/10~2018/11",
  },
  {
    name: "한국에너지기술연구원 웹기반 통합 전자도서관",
    details: "메인, 서브 퍼블리싱 (반응형)",
    detailsDate: "2018/07~2018/09",
  },
  {
    name: "동국대학교 서울경주 첨단도서관",
    details: "동국대학교 서울 메인, 서브 퍼블리싱 (반응형)",
    detailsDate: "2018/04~2018/09",
  },
  {
    name: "우즈베키스탄2016",
    details: "메인, 서브 퍼블리싱 (반응형)",
    detailsDate: "2018/02~2018/03",
  },
  {
    name: "단국대학교 도서관 홈페이지 개편 및 전자도서관",
    details: "메인, 서브 퍼블리싱 (반응형)",
    detailsDate: "2018/01~2018/05",
  },
  {
    name: "한동대학교 도서전산 통합시스템",
    details: "메인, 서브 퍼블리싱",
    detailsDate: "2017/11~2018/01",
  },
  {
    name: "한국직업능력개발원 전자도서관솔루션기능개선및 운영지원",
    details: "메인, 서브 퍼블리싱",
    detailsDate: "2017/11~2017/12",
  },
  {
    name: "해양과학도서관",
    details: "메인, 서브 퍼블리싱",
    detailsDate: "2017/11~2017/12",
  },
  {
    name: "금융감독원 전자도서관",
    details: "메인, 서브 퍼블리싱 (반응형)",
    detailsDate: "2017/10~2017/11",
  },
  {
    name: "한국청소년정책연구원 전자도서관",
    details: "메인, 서브 퍼블리싱",
    detailsDate: "2017/09~2017/10",
  },
  {
    name: "경일대학교 전자도서관",
    details: "메인, 서브 수정",
    detailsDate: "2020/04~2020/05",
  },
];

export const skills = [
  {
    Javascript: "",
  },
  { React: "" },
  { redux: "" },
];
