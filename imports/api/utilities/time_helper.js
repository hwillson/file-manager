import moment from 'moment';

const timeHelper = {
  currentYear() {
    return moment().format('YYYY');
  },
};

export default timeHelper;
