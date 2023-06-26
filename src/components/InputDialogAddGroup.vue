<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent width="1024">
            <template v-slot:activator="{ props }">
                <v-btn  class="ml-3" elevation="0" variant="outlined" color="pink-lighten-1" v-bind="props">
                    <slot />
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="text-h5">添加组别</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="5">
                                <v-text-field label="组别序号*" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="7">
                                <v-text-field label="组别名称" hint="不填则默认显示为“第X组”" persistent-hint></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6" v-for="n in members">
                                <v-text-field :label="`${n}号角色`"></v-text-field>
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
const dialog = ref(false)
defineProps({
  members: {
    type: Number,
    required: true
  }
})
</script>