import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const billStore = createSlice({
    name:'bill',
    initialState:{
        billList:[]
    },
    reducers: {
        setBillList(state, actions){
            state.billList = actions.payload
        },
        // 添加
        addBill(state, actions){
            state.billList.push(actions.payload)
        },
        delBill(state, actions){
            state.billList = state.billList.filter(item=>item.id!==actions.payload)
        },
    }
})

const { setBillList, addBill, delBill } = billStore.actions
// 异步执行
const getBillList = ()=>{
    return async (dispatch)=>{
        const res = await axios.get('http://localhost:8888/ka')
        dispatch(setBillList(res.data))
    }
}
const addBillList = (data)=>{
    return async (dispatch)=>{
        const res = await axios.post('http://localhost:8888/ka', data)
        dispatch(addBill(res.data))
    }
}
const delBillList = (data)=>{
    return async (dispatch)=>{
        await axios.delete(`http://localhost:8888/ka/${data}`)
        dispatch(delBill(data))
    }
}
export { getBillList, addBillList, delBillList }

const reducer = billStore.reducer

export default reducer