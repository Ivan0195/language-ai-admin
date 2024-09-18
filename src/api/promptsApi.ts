import axios from "axios";

export const getPrompts = () => {
   return axios.get('http://localhost:3006/textImprove/getPrompts').then(res => res.data)
}

export const addPrompt = (prompt: {id: string, text: string}) => {
   return axios.post('http://localhost:3006/textImprove/addPrompt', prompt).then(res => res.data)
}

export const removePrompt = (data: {promptId: string}) => {
   return axios.post('http://localhost:3006/textImprove/removePrompt', data).then(res => res.data)
}

export const replacePrompt = (prompt: {id: string, text: string}) => {
   return axios.post('http://localhost:3006/textImprove/replacePrompt', prompt).then(res => res.data)
}

export const getModelTestAnswer = (data: {prompt: string, text: string}) => {
   return axios.post('http://localhost:3006/textImprove/testPrompt', data).then(res => res.data)
}