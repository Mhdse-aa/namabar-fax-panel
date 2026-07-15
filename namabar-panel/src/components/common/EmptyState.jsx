import PropTypes from 'prop-types';

export default function EmptyState({ title }) {
  return <div className="empty-state">{title}</div>;
}

EmptyState.propTypes = {
  title: PropTypes.string.isRequired,
};
