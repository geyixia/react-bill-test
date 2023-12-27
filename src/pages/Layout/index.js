
import { Outlet } from 'react-router-dom'
import { Button } from 'antd-mobile'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getBillList } from '@/store/modules/billStore'
const Layout = ()=>{
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getBillList())
    }, [dispatch])

    return (
        <div>
            Layout
            <Outlet />
            {/* 测试全局生效样式 */}
            <Button color='primary'>测试全局</Button>
            <div className='purple-theme'>
                <Button color='primary'>测试局部</Button>
            </div>
        </div>
    )
}

export default Layout