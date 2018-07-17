import { connect } from 'react-redux';

import { dashboard } from 'state';
import Dashboard from './Dashboard';
import { getState } from '../../state/utils';

const { operations } = dashboard;

const mapStateToProps = state => {
    const dashboard = getState(state, 'dashboard');
    return {
        data: dashboard.data,
        loading: dashboard.loading,
        isError: dashboard.isError
    };
};

const mapDispatchToProps = dispatch => ({
    fetchUserEpic: () => dispatch(operations.fetchUser()),
    cancelFetchUser: () => dispatch(operations.cancelFetchUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
