
import { Button, DatePicker, Input, NavBar } from 'antd-mobile'
import Icon from '@/components/Icon'
import './index.scss'
import classNames from 'classnames'
import { billListData } from '@/utils/month'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { addBillList } from '@/store/modules/billStore'
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday'
dayjs.extend(isToday)

const New = () => {
    // 收集金额
  const [money, setMoney] = useState(0)
  const moneyChange = (value) => {
    setMoney(value)
  }
  // 时间戳
  const [date, setDate] = useState(new Date())
  const dayjsDate = dayjs(date)
  const dateText = dayjsDate.isToday() ? '今天' : dayjsDate.format('YYYY/MM/DD')
   // 收集账单类型
   const [useFor, setUseFor] = useState('')
   const dispatch = useDispatch()
   // 保存账单
   const saveBill = () => {
     // 收集表单数据
     const data = {
       type: billType,
       money: billType === 'pay' ? -money : +money,
       date: dateText === '今天'
       ? dayjs()
       : dayjs(`${dateText} ${dayjs().format('HH:mm:ss')}`),
       useFor: useFor
     }
     console.log(data)
     dispatch(addBillList(data))
   }
  const navigate = useNavigate()
  // 1. 区分账单状态
  const [billType, setBillType] = useState('income')
  // 时间选择器显示
  const [dataVisible, setDataVisible] = useState(false)


  const dataConfirm = (value)=>{
    setDate(value)
    setDataVisible(false)
  }
  
  return (
    <div className="keepAccounts">
      <NavBar className="nav" onBack={() => navigate(-1)}>
        记一笔
      </NavBar>

      <div className="header">
        <div className="kaType">
          <Button
            shape="rounded"
            className={classNames(billType==='pay'?'selected':'')}
            onClick={() => setBillType('pay')}
          >
            支出
          </Button>
          <Button
            className={classNames(billType==='income'?'selected':'')}
            onClick={() => setBillType('income')}
            shape="rounded"
          >
            收入
          </Button>
        </div>

        <div className="kaFormWrapper">
          <div className="kaForm">
            <div className="date">
              <Icon type="calendar" className="icon" />
              <span className="text" onClick={()=>setDataVisible(true)}>{dateText}</span>
              <DatePicker
                className="kaDate"
                title="记账日期"
                max={new Date()}
                visible={dataVisible}
                onConfirm={dataConfirm}
                onCancel={()=>setDataVisible(false)}
              />
            </div>
            <div className="kaInput">
              <Input
                className="input"
                placeholder="0.00"
                type="number"
                value={money}
                onChange={moneyChange}
              />
              <span className="iconYuan">¥</span>
            </div>
          </div>
        </div>
      </div>

      <div className="kaTypeList">
        {billListData[billType].map(item => {
          return (
            <div className="kaType" key={item.type}>
              <div className="title">{item.name}</div>
              <div className="list">
                {item.list.map(item => {
                  return (
                    <div
                      className={classNames(
                        'item',
                        item.type===useFor&&'selected'
                      )}
                      key={item.type}
                      onClick={() => setUseFor(item.type)}
                    >
                      <div className="icon">
                        <Icon type={item.type} />
                      </div>
                      <div className="text">{item.name}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="btns">
        <Button className="btn save" onClick={saveBill}>
          保 存
        </Button>
      </div>
    </div>
  )
}

export default New