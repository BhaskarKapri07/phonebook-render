const Filter = ({ filter, handleFilter }) => {
  return (
    <div>
      <form>
        <div>
          filter shown with <input value={filter} onChange={handleFilter} />
        </div>
      </form>
    </div>
  );
};

export default Filter;
