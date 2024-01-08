import classNames from "classnames";
import "./index.scss";
import { useMemo, useState } from "react";
import {  billTypeToName } from "../../../utils/month";
import Icon from '../../../components/Icon/index';
import { delBillList } from "@/store/modules/billStore";
import { useDispatch } from 'react-redux';

const DailyBill = ({ date, billList }) => {
  const dispatch = useDispatch()
  const dayResult = useMemo(() => {
    // 支出  /  收入  / 结余
    const pay = billList
      .filter((item) => item.type === "pay")
      .reduce((a, c) => a + c.money, 0);
    const income = billList
      .filter((item) => item.type === "income")
      .reduce((a, c) => a + c.money, 0);
    return {
      pay,
      income,
      total: pay + income,
    };
  }, [billList]);
  const [up, setUp] = useState(false);
  const deleteDateItem=(item)=>{
    dispatch(delBillList(item.id))
  }
  return (
    <div className={classNames("dailyBill")} onClick={()=>{setUp(!up)}}>
      <div className="header">
        <div className="dateIcon">
          <span className="date">{date}</span>
          <span className={classNames("arrow", up && "expand")}></span>
        </div>
        <div className="oneLineOverview">
          <div className="pay">
            <span className="type">支出</span>
            <span className="money">{dayResult.pay.toFixed(2)}</span>
          </div>
          <div className="income">
            <span className="type">收入</span>
            <span className="money">{dayResult.income.toFixed(2)}</span>
          </div>
          <div className="balance">
            <span className="money">{dayResult.total.toFixed(2)}</span>
            <span className="type">结余</span>
          </div>
        </div>
      </div>
      {up && <div className="billList">
        {billList.map((item) => {
          return (
            <div className="bill" key={item.id}>
              <Icon type={item.useFor} />
              <div className="detail">
                <div className="billType">{billTypeToName[item.useFor]}</div>
              </div>
              <div className={classNames("money", item.type)}>
                {item.money.toFixed(2)}
              </div>
              <div className="delete" onClick={()=>{deleteDateItem(item)}}>删除</div>
            </div>
          );
        })}
      </div>}
    </div>
  );
};
export default DailyBill;
