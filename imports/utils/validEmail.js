import { regex_email } from '/imports/utils/regex';

export default (email) => {
    return regex_email.test(String(email).toLowerCase());
}