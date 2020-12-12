import LeftSidbar from './leftSidbar.jsx'
import { connect } from 'react-redux'

const mapStateToProps=(state)=>{
    return{
        month:state.section.month
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{

    }
}

const LeftSidbarContainer=connect(mapStateToProps,mapDispatchToProps)(LeftSidbar)

export default LeftSidbarContainer