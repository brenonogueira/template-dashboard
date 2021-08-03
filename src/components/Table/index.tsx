import React from 'react';
import Button from '@material-ui/core/Button';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';

const FilterComponent = ({ filterText, onFilter, onClear }: any) => (
  <>
    <TextField id="search" type="text" placeholder="Filter By Name" aria-label="Search Input" value={filterText} onChange={onFilter} />
    <ClearButton type="button" onClick={onClear}>X</ClearButton>
  </>
);

const columns = [
  {
    name: 'Nome Coluna 1',
    selector: 'title',
    sortable: true,
  },
  {
    name: 'Nome Coluna 2',
    selector: 'title2',
    sortable: true,
  },
  {
    name: 'Nome Coluna 3',
    selector: 'title3',
    sortable: true,
  },
  {
    name: 'Year',
    selector: 'year',
    sortable: true,
  },

];

const data = [
  { id: 1, title: 'Conan the Barbarian', title2: 'Conan the Barbarian', title3: 'Conan the Barbarian', year: '1982' },
  { id: 2, title: 'Bonan the Barbarian', title2: 'Conan the Barbarian', title3: 'Conan the Barbarian', year: '1982' },
  { id: 3, title: 'dasdadadsadad', title2: 'Conan the Barbarian', title3: 'Conan the Barbarian', year: '1982' },
  { id: 4, title: 'sdddddddd', title2: 'Conan the Barbarian', title3: 'Conan the Barbarian', year: '1982' },
  { id: 5, title: 'teste', title2: 'Conan the Barbarian', title3: 'Conan the Barbarian', year: '1982' },
  { id: 6, title: 'alo', title2: 'Conan the Barbarian', title3: 'Conan the Barbarian', year: '1982' },
]

const TextField = styled.input`
  height: 32px;
  width: 200px;
  border-radius: 3px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 1px solid #e5e5e5;
  padding: 0 32px 0 16px;

  &:hover {
    cursor: pointer;
  }
`;

const ClearButton = styled.button`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  height: 34px;
  width: 32px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BasicTable = () => {
  const [filterText, setFilterText] = React.useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
  const filteredItems = data.filter(item => item.title.toLowerCase().includes(filterText.toLowerCase()));

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };

    return <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />;
  }, [filterText, resetPaginationToggle]);

  const isBrowser = typeof window !== "undefined";

  return isBrowser ? (
    <DataTable
      title="Contact List"
      columns={columns}
      data={filteredItems}
      pagination
      paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
      subHeader
      subHeaderComponent={subHeaderComponentMemo}
      selectableRows
      persistTableHead
    />
  ) : null;
}

export default BasicTable;
