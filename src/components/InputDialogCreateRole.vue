<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" transition="dialog-top-transition" persistent width="1024">
            <template v-slot:activator="{ props }">
                <v-btn color="pink-lighten-2" v-bind="props">
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
                            <v-col cols="12" sm="9" md="5">
                                <v-text-field label="新角色名称*" v-model="roleName" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="9" md="5">
                                <v-text-field label="新角色外文名称" v-model="roleOriginalName" hint="没有则不填"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="3" md="2">
                                <v-text-field label="名称简写*" v-model="roleAbbr" hint="由三个大写字母组成" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-select v-model="zoneSelect" :items="zoneItems" item-title="state" item-value="abbr"
                                    label="所属赛区*"
                                    :hint="`${zoneSelect.abbr ? zoneSelect.state + ',' + zoneSelect.abbr : ''}`"
                                    persistent-hint return-object required></v-select>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-autocomplete v-model="officialSelect" :items="officialItems" item-title="state"
                                    item-value="abbr" label="所属企划*"
                                    :hint="`${officialSelect&&officialSelect.abbr ? officialSelect.state + ',' + officialSelect.abbr : ''}`"
                                    persistent-hint return-object required></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="8">
                                <v-text-field label="备注"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="4">
                                <v-file-input label="角色封面" v-model="roleImg" @change="uploadImg" chips></v-file-input>
                            </v-col>
                            <v-col cols="12" sm="8" v-if="roleImgId" class="d-flex">
                                <div v-for="imgId in [roleImgId]" class="w-50 position-relative rounded-xl ml-3"
                                    style="padding-top: 75%;">
                                    <v-img cover class="position-absolute" aspect-ratio="320/240"
                                        style="top:0;left: 0;right: 0;bottom: 10%" :src="fileUrl(imgId)">
                                        <template v-slot:placeholder>
                                            <div class="d-flex align-center justify-center fill-height">
                                                <v-progress-circular color="grey-lighten-4"
                                                    indeterminate></v-progress-circular>
                                            </div>
                                        </template>
                                    </v-img>
                                </div>
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
                    <v-btn color="blue-darken-1" variant="text" @click="submit" :disabled="loading || disableSubmit()"
                        :loading="loading">
                        提交
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
import { zones } from '@/data/zone'
import { officials } from '@/data/official'
import { create } from '@/api/role'
import { upload, fileUrl } from '@/api/file'
const initZone = () => {
    let items = []
    for(let z in zones){
        if(zones[z].abbr){
            items.push({state:zones[z].name,abbr:zones[z].abbr})
        }
    }
    return items
}
const initOfficial = () => {
    let items = []
    for(let o in officials){
        if(officials[o].abbr){
            items.push({state:officials[o].name,abbr:officials[o].abbr,parent:officials[o].parent})
        }
    }
    return items
}
const zoneItems = initZone()
const officialItems = initOfficial()
const zoneSelect = ref([]) as any | Object
const officialSelect = ref([]) as any | Object
const roleName = ref(undefined) as any | string
const roleOriginalName = ref(undefined) as any | string
const roleAbbr = ref(undefined) as any | string
const roleImg = ref(undefined) as any | [File?]
const roleImgId = ref('')
const dialog = ref(false)
const loading = ref(false)
const disableSubmit = () => {
    return !roleName.value || !roleAbbr.value
}
const submit = async () => {
    loading.value = true
    const createForm = reactive({
        code: officialSelect.value.abbr + roleAbbr.value,
        name: roleName.value,
        originalName: roleOriginalName.value || undefined,
        frontImg: roleImgId.value,
        official: officialSelect.value.abbr,
        parentOfficial: officialSelect.value.parent,
        zone: zoneSelect.value.abbr,
    })
    console.log(createForm);
    const data = await create(createForm)
    console.log(data);
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
        setTimeout(() => { loading.value = false }, 500)
    }
    else {
        roleImgId.value = ''
    }
}
</script>