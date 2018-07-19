import { connect } from 'react-redux';
import { getState } from '../../state/utils';
import { dashboard } from 'state';
import SearchData from './SearchData';

const { operations } = dashboard;

const mapStateToProps = state => {
    const dashboard = getState(state, 'dashboard');
    return {
        searchData: dashboard.search,
        isLoading: dashboard.isLoading,
        isError: dashboard.isError
    };
};

const mapDispatchToProps = dispatch => ({
    search: (data) => dispatch(operations.search(data)),
    leave: () => dispatch(operations.leave()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchData);


