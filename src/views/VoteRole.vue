<script lang="ts" setup>
interface chara {
  code: Uppercase<string>;
  zone: Uppercase<string>;
  name: string;
  originalName?: string;
  official: [string] | [string, string];
  imageIDs: {}[];
  history: {};
  remark?: string;
}
class Official {
  id: Uppercase<string>;
  name: string;
  originalName?: string;
  public constructor(id: Uppercase<string>, name: string, originalName?: string) {
    this.id = id
    this.name = name
    originalName && (this.originalName = originalName)
  }
}
const officials: Official[] = [
  new Official('NJ','彩虹社（JP）'),
	new Official('NE','彩虹社（EN）'),
	new Official('VT','VTA虚拟艺人学院'),
	new Official('VR','VirtuaReal'),
	new Official('AS','A-SOUL'),
	new Official('CH','Chaoslive'),
	new Official('NE','网易'),
	new Official('PW','完美世界'),
	new Official('SI','四禧丸子'),
	new Official('TE','Tencent'),
	new Official('XY','虚研社'),
	new Official('AM','Amalis'),
	new Official('HI','Hololive（ID）'),
	new Official('HJ','花寄女子寮'),
	new Official('HO','Hololive'),
	new Official('HX','Hololive（HoloX）'),
	new Official('PR','帕里坡'),
	new Official('VW','V.W.P.'),
	new Official('HE','Hololive（EN）'),
	new Official('VS','Vshojo'),
	new Official('YS','Yostar'),
	new Official('OT','others'),
]
class Character {
  // 定义成员变量并指定类型
  remark
  public constructor(remark: string) {
    this.remark = remark
  }
  handleCode(code: number): void {
  }
}
const characters: chara[] = [
  {
    code: 'OTLIN',
    zone: 'CHI',
    name: '凜凜蝶凜',
    official: ['OT'],
    imageIDs: ['……'],
    history: {},
  }, {
    code: 'OTMAY',
    zone: 'CHI',
    name: '麻尤米Mayumi',
    official: ['OT'],
    imageIDs: ['……'],
    history: {},
  }, {
    code: 'HEGAW',
    zone: 'ENG',
    name: '噶呜·古拉',
    originalName: 'Gawr Gura',
    official: ['HO', 'HE'],
    imageIDs: ['……'],
    history: {},
  }
]
</script>


<template>
  <TheContainer>
    <h1>全部角色</h1>
  </TheContainer>
</template>



<style scoped>

</style>




