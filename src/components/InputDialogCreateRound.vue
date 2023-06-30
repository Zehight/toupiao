<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent width="1024">
            <template v-slot:activator="{ props }">
                <v-btn color="pink-lighten-3" v-bind="props">
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
                                <v-text-field label="新轮次名称*" v-model="roundName" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field label="展示开始时间*" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field label="投票开始时间" v-model="startVoteTime" hint="不填则表示在开始展示的同时开始投票"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field label="投票结束时间*" v-model="endVoteTime" hint="必须在展示与投票开始时间之后" persistent-hint required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-select label="规格*" v-model="modelSelect" :items="modelItems" required></v-select>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-switch label="创建完成后自动生成空组别" v-model="emptyGroup"></v-switch>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
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
                    <v-btn color="blue-darken-1" variant="text" @click="dialog = false" :disabled="loading||disableSubmit()" :loading="loading">
                        保存
                        <template v-slot:loader>
                            <v-progress-linear indeterminate></v-progress-linear>
                        </template>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>
<script lang="ts" setup>
const modelItems = ['正赛', '海选赛', '表演赛']
const modelSelect = ref([]) as any | string
const roundName = ref(undefined) as any | string
const startVoteTime = ref(undefined) as any | string
const endVoteTime = ref(undefined) as any | string
const dialog = ref(false)
const emptyGroup = ref(true)
const loading = ref(false)
const disableSubmit = ()=>{
    return !roundName.value || !startVoteTime.value|| !endVoteTime.value
}
</script>