namespace Official {
  export interface OfficialInfo {
    abbr: Uppercase<string>;
    name: string;
    originalName?: string;
    parent?: Uppercase<string>;
  }
  export interface OfficialInfoData extends Record<string,Official.OfficialInfo>{}
}
export const officials:Official.OfficialInfoData = {
  NJ:{
    abbr:'NJ',
    name:'彩虹社',
    originalName: 'Nijisanji',
  },
  NE:{
    abbr:'NE',
    name:'彩虹社EN',
    originalName: 'Nijisanji EN',
    parent: 'NJ',
  },
  VT:{
    abbr:'VT',
    name:'VTA虚拟艺人学院',
    originalName: 'Nijisanji',
    parent: 'NJ',
  },
  VR:{
    abbr:'VR',
    name:'VirtuaReal',
  },
  YH:{
    abbr:'YH',
    name:'乐华娱乐',
  },
  AS:{
    abbr:'AS',
    name:'A-SOUL',
    parent: 'YH',
  },
  EO:{
    abbr:'EO',
    name:'EOE',
    parent: 'YH',
  },
  CH:{
    abbr:'CH',
    name:'Chaoslive',
  },
  NB:{
    abbr:'NB',
    name:'NB厂',
  },
  NT:{
    abbr:'NT',
    name:'网易',
    originalName: 'NetEase',
  },
  PW:{
    abbr:'PW',
    name:'完美世界',
    originalName: 'Perfect World',
  },
  SI:{
    abbr:'SI',
    name:'四禧丸子',
  },
  TE:{
    abbr:'TE',
    name:'腾讯',
    originalName: 'Tencent',
  },
  XY:{
    abbr:'XY',
    name:'虚研社',
  },
  AM:{
    abbr:'AM',
    name:'Amalis',
  },
  HO:{
    abbr:'HO',
    name:'Hololive',
  },
  HX:{
    abbr:'HX',
    name:'HoloX',
    parent: 'HO',
  },
  PR:{
    abbr:'PR',
    name:'帕里坡',
    originalName: 'Paryi Project',
  },
  OT:{
    abbr:'OT',
    name:'其他',
    originalName: 'others',
  },
}