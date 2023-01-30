import PropTypes from 'prop-types';

import styles from './filter.module.scss';

const Filter = ({ handleFilter, filter }) => {
  return (
    <div className={styles.filter}>
      <label className={styles.label}>
        Find contacts by name
        <input
          type="text"
          name="filter"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          placeholder="Name"
          value={filter}
          onChange={handleFilter}
          className={styles.input}
        />
      </label>
    </div>
  );
};

export default Filter;

Filter.propTypes = {
  handleFilter: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};