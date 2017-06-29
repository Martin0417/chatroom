import {connect} from 'react-redux';
import {setInputValue} from 'actions';
import UserList from 'components/UserList';

const mapStateToProps = (state, ownProps) => {
    let {userList} = state;
    return {
        list: userList
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleDoubleClick(user){
            let {id, name} = user;
            dispatch(setInputValue(`发送给 ${name}(${id})：`));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);