<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent width="1024">
            <template v-slot:activator="{ props }">
                <v-btn color="secondary" v-bind="props">
                    <slot />
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="text-h5">创建新角色</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="9">
                                <v-text-field label="新角色名称*" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="3">
                                <v-text-field label="名称简写*" hint="由三个大写字母组成" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-select v-model="zoneSelect" :items="zoneItems" item-title="state" item-value="abbr"
                                    label="所属赛区*" :hint="`${zoneSelect.abbr ? zoneSelect.state + ',' + zoneSelect.abbr : ''}`"
                                    persistent-hint return-object required></v-select>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-select v-model="projectSelect" :items="projectItems" item-title="state" item-value="abbr"
                                    label="所属企划*" :hint="`${projectSelect.abbr ? projectSelect.state + ',' + projectSelect.abbr : ''}`"
                                    persistent-hint return-object required></v-select>
                            </v-col>
                            <v-col cols="12" sm="7">
                                <v-text-field label="备注"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="5">
                                <v-file-input chips multiple label="角色封面"></v-file-input>
                            </v-col>
                        </v-row>
                    </v-container>
                    <small>*表示必填项目</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
                        关闭
                    </v-btn>
                    <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
                        保存
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>
<script lang="ts" setup>
const zoneItems = [
    { state: "彩虹赛区", abbr: "NIJ" },
    { state: "华语赛区", abbr: "CHI" },
    { state: "英语赛区", abbr: "ENG" },
    { state: "外卡赛区", abbr: "WIL" },
    { state: "大物赛区", abbr: "BIG" },
]
const zoneSelect = ref([]) as any | Object
const projectItems = [
    { state: "彩虹社(本社)", abbr: "NJ" },
    { state: "彩虹社(EN)", abbr: "NE" },
    { state: "VirtuaReal", abbr: "VR" },
    { state: "A-SOUL", abbr: "AS" },
    { state: "完美世界", abbr: "PW" },
    { state: "Tencent", abbr: "TE" },
    { state: "虚研社", abbr: "XY" },
    { state: "Amalis", abbr: "AM" },
    { state: "Hololive", abbr: "HO" },
    { state: "帕里坡", abbr: "PR" },
    { state: "其他", abbr: "OT" },
]
const projectSelect = ref([]) as any | Object
const ruleItems = ['双败:第二名进入败者组', '双败:败者组第二名被淘汰', '冒泡赛:每组第二名与另一组的第三名进行加赛', '瑞士轮:第一轮', '瑞士轮:第二轮', '瑞士轮:第三轮', 'V萌决赛:中途不进行报票', 'V萌半决赛:中途不进行报票']
const ruleSelect = ref([]) as any | string
const dialog = ref(false)
</script>