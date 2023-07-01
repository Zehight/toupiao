<template>
    <v-dialog v-model="dialog" width="900">
        <template v-slot:activator="{ props }">
            <div @click="dialog = true">
                <slot />
            </div>
        </template>
        <v-card>
            <v-card-title>
                <span class="text-h5">{{ roleInfo.name }}</span>
            </v-card-title>
            <v-card-subtitle v-if="roleInfo.originalName">
                <span class="text-h5">{{ roleInfo.originalName }}</span>
            </v-card-subtitle>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" md="4" sm="6">
                            <div v-for="imgId in roleInfo.frontImgs" class="w-75 position-relative rounded-xl ml-3"
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
                        <v-col cols="12" md="8" sm="6">
                            <v-row>
                                <v-col cols="12" sm="6">
                                    <v-text-field label="中文名称" v-model="roleName" :readonly="readonly"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field label="外文名称" v-if="roleOriginalName" v-model="roleOriginalName"
                                        :readonly="readonly"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-select v-model="zoneSelect" :items="zoneItems" item-title="state" item-value="abbr"
                                        label="所属赛区"
                                        :hint="`${zoneSelect.abbr ? zoneSelect.state + ',' + zoneSelect.abbr : ''}`"
                                        persistent-hint return-object :readonly="readonly"></v-select>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-autocomplete v-model="officialSelect" :items="officialItems" item-title="state"
                                        item-value="abbr" label="所属企划"
                                        :hint="`${officialSelect && officialSelect.abbr ? officialSelect.state + ',' + officialSelect.abbr : ''}`"
                                        persistent-hint return-object :readonly="readonly"></v-autocomplete>
                                </v-col>
                                <v-col cols="6" sm="6">
                                </v-col>
                                <v-col cols="6" sm="6">
                                    <v-text-field label="上级企划" v-if="preRoleInfo.parentOfficial"
                                        v-model="officials[preRoleInfo.parentOfficial].name" disabled></v-text-field>
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
                            <v-btn color="pink-lighten-2" @click="alterImg = !alterImg" :readonly="loading">
                                {{ alterImg ? `结束图像管理` : `图像管理` }}
                                <template v-slot:loader>
                                    <v-progress-linear indeterminate></v-progress-linear>
                                </template>
                            </v-btn>
                        </v-col>
                        <v-col cols="12" md="4" sm="4">
                            <v-file-input v-if="alterImg" label="添加图片" v-model="roleImg" @change="uploadImg"
                                :readonly="loading" chips></v-file-input>
                            <v-btn v-else color="pink-lighten-2" v-bind="">
                                荣誉管理
                            </v-btn>
                        </v-col>
                        <v-col cols="12" md="2" sm="4">
                            <v-btn v-if="alterImg" color="pink-darken-1" :loading="loading">
                                重新设置封面
                                <template v-slot:loader>
                                    <v-progress-linear indeterminate></v-progress-linear>
                                </template>
                            </v-btn>
                            <v-btn v-else color="pink-darken-3" @click="deleteRole(preRoleInfo.id)">
                                删除角色
                            </v-btn>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field label="备注"></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
                <small>*表示必填项目</small>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="dialog = false" :loading="loading">
                    关闭
                    <template v-slot:loader>
                        <v-progress-linear indeterminate></v-progress-linear>
                    </template>
                </v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="dialog = false" :loading="loading">
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
import { delRole, addRoleImg } from '@/api/role'
import { upload, fileUrl } from '@/api/file'
import { zones } from '@/data/zone'
import { officials } from '@/data/official'
const prop = defineProps(['roleInfo'])
const dialog = ref(false)
const readonly = ref(true)
const alterImg = ref(false)
const preRoleInfo = reactive({ ...prop.roleInfo })
const initZone = () => {
    let items = []
    for (let z in zones) {
        if (zones[z].abbr) {
            items.push({ state: zones[z].name, abbr: zones[z].abbr })
        }
    }
    return items
}
const initOfficial = () => {
    let items = []
    for (let o in officials) {
        if (officials[o].abbr) {
            items.push({ state: officials[o].name, abbr: officials[o].abbr, parent: officials[o].parent })
        }
    }
    return items
}
const zoneItems = initZone()
const officialItems = initOfficial()
const roleName = ref(preRoleInfo.name) as any | string
const roleOriginalName = ref(preRoleInfo.originalName) as any | string
const zoneSelect = ref(zoneItems.filter(z => z.abbr === preRoleInfo.zone)) as any | Object
const officialSelect = ref(officialItems.filter(o => o.abbr === preRoleInfo.official)) as any | Object
const loading = ref(false)
const roleImg = ref(undefined) as any | [File?]
const roleImgId = ref(undefined) as any | string
const submit = async () => {
    loading.value = true
    const data = await addRoleImg(preRoleInfo.id, roleImgId.value)
    setTimeout(() => { loading.value = false }, 500)
}
const uploadImg = async (e: any) => {
    if (roleImg.value[0]) {
        loading.value = true
        const imgForm = reactive({
            file: roleImg.value[0],
        })
        const img = await upload(imgForm)
        roleImgId.value = img.id || ''
        setTimeout(submit, 100)
    }
    else {
        roleImgId.value = ''
    }
}
const deleteRole = async (id: string) => {
    loading.value = true
    const data = await delRole(id)
    setTimeout(() => {
        loading.value = false
        setTimeout(() => { dialog.value = false }, 100)
    }, 500)
}
</script>