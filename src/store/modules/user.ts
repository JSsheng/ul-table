import { defineStore } from "pinia";
import { ref } from "vue";
import { store } from '../index';
import { loginApi } from '../../api/user';
import { getItem, setItem, removeItem } from '../../utils/storage';
import router from "../../router";

const TOKEN_KEY = 'NT-Token';
const USER_INFO = "NT-UserInfo"

export const useUserStore = defineStore('user', () => {
  const getToken = () => getItem(TOKEN_KEY);
  const setToken = (value: string) => setItem(TOKEN_KEY, value);
  const removeToken = () => removeItem(TOKEN_KEY);
  const getUserInfo = () => getItem(USER_INFO);
  const setUserInfo = (value: string) => setItem(USER_INFO, value);
  const removeUserInfo = () => removeItem(USER_INFO);

  const token = ref(getToken() || '')
  const userInfo = ref(JSON.parse(getUserInfo() || "{}") || {})

  const login = async (loginData: any): Promise<void> => {
    return new Promise((resolve, reject) => {
      loginApi(loginData).then((response: any) => {
        token.value = response.data
        userInfo.value = loginData
        setToken(token.value)
        setUserInfo(JSON.stringify(userInfo.value))
        resolve()
      }).catch((error: any) => {
        removeToken()
        removeUserInfo()
        reject(error)
      })
    })
  }

  const logout = async (): Promise<void> => {
    return new Promise((resolve, reject) => {
      removeToken()
      removeUserInfo()
      router.push('/login')
      resolve()
    })
  }

  return {
    token,
    userInfo,
    logout,
    login
  }
})

export function useUserStoreHook() {
  return useUserStore(store);
}

