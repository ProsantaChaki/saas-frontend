import PropTypes from "prop-types";
import { format } from "date-fns";
import Link from "next/link";
import { FEATURE_TABLE } from '../../common/constantData/language';
import {
  Avatar,
  Box,
  Card,
  Button,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { getInitials } from "src/utils/get-initials";

export const FeatureTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
  } = props;

  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;

  const truncateText = (text, limit) => {
    if (text.length <= limit) {
      return text;
    }
    return text.slice(0, limit) + "...";
  };

  return (
    <Card>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>
                <TableCell>{FEATURE_TABLE.MAME}</TableCell>
                <TableCell>{FEATURE_TABLE.DETAILS}</TableCell>
                <TableCell>{FEATURE_TABLE.ACTION}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((customer) => {
                const isSelected = selected.includes(customer.id);
                // const createdAt = format(customer.createdAt, 'dd/MM/yyyy');

                return (
                  <TableRow hover key={customer.id} selected={isSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(customer.id);
                          } else {
                            onDeselectOne?.(customer.id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        {/* <Avatar src={customer.avatar}> */}
                        {getInitials(customer.name)}
                        {/* </Avatar> */}
                        <Typography variant="subtitle2">{customer.name}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{truncateText(customer.details, 100)}</TableCell>
                    <TableCell>
                      <Link href={`feature/${customer.id}`}>
                      <Button
                        variant="contained"
                        sx={{
                          background: "#00467a",
                          color: "white",
                          border: "",
                        }}
                      >
                        {FEATURE_TABLE.FEATURE_DETAILS_Button}
                      </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

FeatureTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};
