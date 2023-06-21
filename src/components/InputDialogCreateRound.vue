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
                    <span class="text-h5">创建新轮次</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field label="新轮次名称*" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field label="展示开始时间*" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field label="投票开始时间" hint="不填则表示在开始展示的同时开始投票"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field label="投票结束时间*" hint="必须在展示与投票开始时间之后" persistent-hint required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-select v-model="modelSelect" :items="modelItems" label="规格*" required></v-select>
                            </v-col>
                            <v-col cols="12" sm="6" md="4" v-if="modelSelect !== '海选赛'">
                                <v-select :items="[2, 3, 4, 5, 6]" label="每组参赛个数*"></v-select>
                            </v-col>
                            <v-col cols="12" sm="6" md="4" v-if="modelSelect !== '海选赛'">
                                <v-select :items="[1, 2, 3, 4]" label="每组可投票数*"></v-select>
                            </v-col>
                            <v-col cols="12" sm="6" md="4" v-if="modelSelect == '海选赛'">
                                <v-text-field label="晋级名额数量*" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-autocomplete v-model="ruleSelect" :ruleItems="ruleItems" label="特殊规则" chips multiple></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-file-input chips multiple label="投票封面"></v-file-input>
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
const modelItems = ['正赛', '海选赛', '表演赛']
const modelSelect = ref([]) as any | string
const ruleItems = ['双败:第二名进入败者组', '双败:败者组第二名被淘汰', '冒泡赛:每组第二名与另一组的第三名进行加赛', '瑞士轮:第一轮', '瑞士轮:第二轮', '瑞士轮:第三轮', 'V萌决赛:中途不进行报票', 'V萌半决赛:中途不进行报票']
const ruleSelect = ref([]) as any | string
const dialog = ref(false)
</script>