namespace Zone {
  export interface ZoneInfo {
    abbr: Uppercase<string>;
    name: string;
    originalName?: string;
  }
  export interface ZoneInfoData extends Record<string,Zone.ZoneInfo>{}
}
export const zones:Zone.ZoneInfoData = {
  NIJ:{
    abbr:'NIJ',
    name:'彩虹赛区',
    originalName: 'Nijisanji Zone',
  },
  CHI:{
    abbr:'CHI',
    name:'华语赛区',
    originalName: 'Chinese Zone',
  },
  JAP:{
    abbr:'JAP',
    name:'日语赛区',
    originalName: 'Japanese Zone',
  },
  ENG:{
    abbr:'ENG',
    name:'英语赛区',
    originalName: 'English Zone',
  },
  WIL:{
    abbr:'WIL',
    name:'外卡赛区',
    originalName: 'Wild Card Zone',
  },
  BIG:{
    abbr:'BIG',
    name:'大物赛区',
    originalName: 'Big Name Zone',
  },
}