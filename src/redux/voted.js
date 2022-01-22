const initial = {
    blockHash:'',cumulativeGasUsed:'',from:' ',gasUsed:'',to :' ',
    transactionHash:''
  }
const voted=(state=initial,action)=>{
    switch(action.type){
        case 'new_data':
            const val=action.payload 
            initial={...initial,blockHash:val.blockHash,cumulativeGasUsed:val.cumulativeGasUsed,from:val.from,
                gasUsed:val.gasUsed,to:val.to,transactionHash:val.transactionHash
                      }
            return state
        default:
            return state
                    }

}
export default voted