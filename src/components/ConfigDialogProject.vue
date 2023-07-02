<template>
    <v-dialog v-model="dialog" persistent width="800">
        <template v-slot:activator="{ props }">
            <v-btn class="ml-3" elevation="0" variant="outlined" color="pink-lighten-1" v-bind="props">
                <slot />
            </v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="text-h5">活动配置</span>
            </v-card-title>
            <v-card-subtitle>
                <span class="text-h5">{{ projectInfo.originalName }}</span>
            </v-card-subtitle>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col v-if="projectInfo.frontImg" cols="12" md="6" sm="8">
                            <div v-for="imgId in [projectInfo.frontImg]" class="w-100 position-relative rounded-xl ml-3"
                                style="padding-top: 120%;">
                                <v-img cover class="position-absolute" aspect-ratio="320/240"
                                    style="top:0;left: 0;right: 0;bottom: 10%" :src="fileUrl(imgId)">
                                    <template v-slot:placeholder>
                                        <div class="d-flex align-center justify-center fill-height">
                                            <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                                        </div>
                                    </template>
                                </v-img>
                            </div>
                        </v-col>
                        <v-col cols="12" md="6" sm="4">
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field label="活动名称" v-model="actName" :rules="[rules.require]"
                                        :readonly="readonly" :disabled="loading"></v-text-field>
                                </v-col>
                                <v-col cols="12" lg="6">
                                    <v-text-field label="开始时间" v-model="startTime" :rules="[rules.require, rules.isDate]"
                                        :readonly="readonly" :disabled="loading"></v-text-field>
                                </v-col>
                                <v-col cols="12" lg="6">
                                    <v-text-field label="结束时间" v-model="endTime"
                                        :rules="[rules.require, rules.isDate, rules.end]" hint="必须在开始时间之后"
                                        :readonly="readonly" :disabled="loading"></v-text-field>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="2" sm="4">
                            <v-btn color="pink-lighten-2" @click="readonly = !readonly">
                                {{ readonly ? `结束修改信息` : `修改信息` }}
                            </v-btn>
                        </v-col>
                        <v-col cols="12" md="2" sm="4">
                            <v-btn color="pink-darken-3" @click="deleteProject(preRoleInfo.id)">
                                删除活动
                            </v-btn>
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
                <v-btn color="blue-darken-1" variant="text" @click="dialog = false" :disabled="loading || disableSubmit()"
                    :loading="loading">
                    保存
                    <template v-slot:loader>
                        <v-progress-linear indeterminate></v-progress-linear>
                    </template>
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script lang="ts" setup>
import { delAct } from '@/api/activity'
import { fileUrl } from '@/api/file'
const prop = defineProps(['projectInfo','update'])
const preRoleInfo = reactive({ ...prop.projectInfo })
const actName = ref(preRoleInfo.name) as any | string
const startTime = ref(preRoleInfo.startTime) as any | string
const endTime = ref(preRoleInfo.endTime) as any | string
const dialog = ref(false)
const readonly = ref(true)
const loading = ref(false)
const rules = {
    require: (value: any) => !!value || '该项目不能为空',
    isDate: (value: any) => /[0-9]{2,4}-[0-9]{2}-[0-9]{2}/.test(value) || '请填写如同“2018-12-01”的数据',
    end: (value: any) => !startTime.value || Date.parse(value) > Date.parse(startTime.value) || '必须在开始时间之后',
}
const disableSubmit = () => {
    return !actName.value || !startTime.value || !endTime.value
}
const deleteProject = async (id: string) => {
    loading.value = true
    const data = await delAct(id)
    setTimeout(() => {
        loading.value = false
        prop.update()
        setTimeout(() => { dialog.value = false }, 100)
    }, 500)
}
</script>