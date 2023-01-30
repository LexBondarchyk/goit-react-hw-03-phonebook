import PropTyps from 'prop-types';
import { ImMobile } from 'react-icons/im';
import { IconContext } from 'react-icons';

import styles from './contactList.module.scss';

const ContactList = ({ contacts, remuveContact }) => {
  return (
    <ul className={styles.contactsList}>
      {contacts.map(contact => {
        const { id, name, number } = contact;
        return (
          <li key={id} className={styles.contactList}>
            <span className={styles.contact}>
              <IconContext.Provider value={{ style: { color: 'rgb(0 231 255)' } }}>
                <ImMobile />
              </IconContext.Provider>
              {name}: <span className={styles.number}>{number}</span>
            </span>
            <button
              type="button"
              className={styles.button}
              onClick={() => remuveContact(id)}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default ContactList;

ContactList.defaultProps = {
  contacts: [],
};

ContactList.propTyps = {
  remuveContact: PropTyps.func.isRequired,
  contacts: PropTyps.arrayOf(
    PropTyps.shape({
      id: PropTyps.string.isRequired,
      name: PropTyps.string.isRequired,
      number: PropTyps.string.isRequired,
    })
  ),
};