import React, { PropTypes } from 'react';
import { Menu, Icon,Table} from 'antd';
import {GetBitData,GetDetailData} from '../Actions/transactionAction';
import {connect} from "react-redux";

@connect((store)=>{    
    return {
      BitData:store.Transaction
    };
    
})
export default class Header extends React.Component {
			  constructor(props) {
			    super(props);

			    this.props.dispatch(GetBitData());
			    console.log(this.props)

			const columns = [{
			  title: '比特币/汇率',
			  dataIndex: 'symbol',
			  key: 'symbol',
			  render:(text,record) =>
            <a href="#" onClick={this.GoToDetail.bind(this,record)} >{record.symbol}</a>

			}, {
			  title: '价格',
			  dataIndex: 'p_new',
			  key: 'p_new',
			}, 
			{title:"今日",
				children:[{title:"浮动",
						  dataIndex: 'level',
						  key: 'level'},
						  {title:"交易量",
						  dataIndex: 'amount',
						  key: 'amount'}
						  ]
			}


			];

			this.refreshData =this.refreshData.bind(this)
this.state={columns:columns}
  }

GoToDetail(record)
{ 
	console.log(record.symbol);
	this.props.dispatch(GetDetailData(record.symbol));
}

  refreshData()
  {
  	this.props.dispatch(GetBitData());
  }

  componentDidMount() {
	
  //	setInterval(this.refreshData,10000)
	}


 render() {
 	console.log(this.props);
 	var dataS=[];
 	if(this.props.BitData.BitData)
 	 { dataS.push(this.props.BitData.BitData)
     }
     return (
     <div>
     <Table dataSource={dataS} columns={this.state.columns}  bordered />

     </div>
     )
  
}
}
