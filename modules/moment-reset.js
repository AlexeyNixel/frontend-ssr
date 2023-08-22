import moment from 'moment';
import ru from 'moment/dist/locale/ru';

module.exports = function momentResetModule() {
  moment.locale('ru');
  moment.updateLocale('ru', ru);
};