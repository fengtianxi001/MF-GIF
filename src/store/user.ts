import { defineStore } from "pinia"

export type UserInfoType = {
  account: string
  avatar: string
  name: string
  email: string
  mobile: string
  permission: string[]
}

const useUserStore = defineStore("user", {
  state: (): UserInfoType => ({
    account: "",
    avatar: "",
    name: "",
    email: "",
    mobile: "",
    permission: [],
  }),
  getters: {
    userInfo(state: UserInfoType): UserInfoType {
      return { ...state }
    },
  },
  actions: {
    setUserInfo(partial: Partial<UserInfoType>) {
      this.$patch(partial)
    },
    resetUserInfo() {
      this.$reset()
    },
  },
})

export default useUserStore
