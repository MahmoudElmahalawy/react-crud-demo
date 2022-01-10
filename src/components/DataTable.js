import React, { useState, useEffect } from "react";

import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import Tooltip from "@mui/material/Tooltip";

import DeleteBtn from "./DeleteBtn";
import EditBtn from "./EditBtn";

const StickyHeadTable = ({ data, setData, tableHeaders, changeCurrentUser, deleteUser }) => {
	const [columns, setColumns] = useState(null);
	const [rows, setRows] = useState(null);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const formatArrayColumn = (arr, maxLength) => {
		return (
			<>
				{arr?.length > maxLength ? (
					<>
						{arr?.slice(0, maxLength).join(", ")}
						{
							<Tooltip title={"..." + arr?.slice(maxLength).join(", ")}>
								<span>...</span>
							</Tooltip>
						}
					</>
				) : (
					arr?.join(", ")
				)}
			</>
		);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	useEffect(() => {
		setColumns(tableHeaders);

		setRows(
			data.map((d) => {
				return Object.assign(
					{},
					...tableHeaders.map((header) => ({ [header.fieldName]: d[header.fieldName], id: d.id }))
				);
			})
		);
	}, [data]);

	return columns === null || rows === null ? (
		<div>No Data</div>
	) : (
		<Grid sx={{ width: "100%", overflow: "auto", padding: 2, border: "1px solid #7775", borderRadius: 2 }}>
			<TableContainer sx={{ maxHeight: 640 }}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<TableCell
									key={column.fieldName}
									style={{ minWidth: column.minWidth || 150, fontWeight: "Bold" }}
								>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
							return (
								<TableRow
									hover
									role="checkbox"
									tabIndex={-1}
									key={row.id}
									onClick={() => changeCurrentUser(data, row.id)}
								>
									{columns.map((column) => {
										const value = row[column.fieldName];
										return column.fieldName !== "actions" ? (
											<TableCell key={column.fieldName}>
												{column.isArray ? formatArrayColumn(value, 2) : value}
											</TableCell>
										) : (
											<TableCell key={column.fieldName}>
												<EditBtn btnData={{ userId: row.id }} />
												<DeleteBtn
													data={data}
													setData={setData}
													btnAction={deleteUser}
													btnData={{ userId: row.id }}
												/>
											</TableCell>
										);
									})}
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[5, 10, 25]}
				component="div"
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Grid>
	);
};
export default StickyHeadTable;
