import React, { useState, useEffect } from 'react';
import MUIDataTable from "mui-datatables";

const Table = (props) => {
    const [title, setTitle] = useState('')
    const [columns, setColumns] = useState([])
    const [data, setData] = useState([])
    const [count, setCount] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)

    useEffect(() => {
        setTitle(props.title)
        setColumns(props.columns)
        setData(props.data)
        setCount(props.count)
        setRowsPerPage(props.rowsPerPage)
    }, [props.columns, props.data, props.title, props.count, props.rowsPerPage])

    const options = {
        filter: false,
        selectableRows: 'none',
        download: false,
        print: false,
        serverSide: props.serverSide,
        count: count,
        rowsPerPage: rowsPerPage,
        rowsPerPageOptions: [10, 20, 50, 1000],
        onTableChange: props.onTableChange,
        onRowClick: props.onRowClick,
        // responsive: 'scrollMaxHeight'
    }

    return (
        <div style={{ display: 'table', tableLayout: 'fixed', width: '100%' }} className="table-2">
            <MUIDataTable
                title={title}
                data={data}
                columns={columns}
                options={options}
            />
        </div>
    );
}

export default Table
