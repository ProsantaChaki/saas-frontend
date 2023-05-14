import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { subDays, subHours } from "date-fns";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { CustomersTable } from "src/sections/customer/customers-table";
import { CustomersSearch } from "src/sections/customer/customers-search";
import { applyPagination } from "src/utils/apply-pagination";

const now = new Date();

const data = [
  {
    id: "1",
    name: "Carson Darrin",
    duration: "12-04-2023",
    user_limit: "3",
    storage_limit: "20gb",
    Price: "500",
    details: "ghasd haghgda ahgahgda hagd",
    features: "En bn",
  },
  {
    id: "2",
    name: "Carson Darrin",
    duration: "12-04-2023",
    user_limit: "3",
    storage_limit: "20gb",
    Price: "500",
    details: "ghasd haghgda ahgahgda hagd",
    features: "En bn",
  },
  {
    id: "3",
    name: "Carson Darrin",
    duration: "12-04-2023",
    user_limit: "3",
    storage_limit: "20gb",
    Price: "500",
    details: "ghasd haghgda ahgahgda hagd",
    features: "En bn",
  },
  {
    id: "4",
    name: "Carson Darrin",
    duration: "12-04-2023",
    user_limit: "3",
    storage_limit: "20gb",
    Price: "500",
    details: "ghasd haghgda ahgahgda hagd",
    features: "En bn",
  },
  {
    id: "5",
    name: "Carson Darrin",
    duration: "12-04-2023",
    user_limit: "3",
    storage_limit: "20gb",
    Price: "500",
    details: "ghasd haghgda ahgahgda hagd",
    features: "En bn",
  },
  {
    id: "6",
    name: "Carson Darrin",
    duration: "12-04-2023",
    user_limit: "3",
    storage_limit: "20gb",
    Price: "500",
    details: "ghasd haghgda ahgahgda hagd",
    features: "En bn",
  },
  {
    id: "7",
    name: "Carson Darrin",
    duration: "12-04-2023",
    user_limit: "3",
    storage_limit: "20gb",
    Price: "500",
    details: "ghasd haghgda ahgahgda hagd",
    features: "En bn",
  },
  {
    id: "8",
    name: "Carson Darrin",
    duration: "12-04-2023",
    user_limit: "3",
    storage_limit: "20gb",
    Price: "500",
    details: "ghasd haghgda ahgahgda hagd",
    features: "En bn",
  },
  {
    id: "9",
    name: "Carson Darrin",
    duration: "12-04-2023",
    user_limit: "3",
    storage_limit: "20gb",
    Price: "500",
    details: "ghasd haghgda ahgahgda hagd",
    features: "En bn",
  },
  {
    id: "10",
    name: "Carson Darrin",
    duration: "12-04-2023",
    user_limit: "3",
    storage_limit: "20gb",
    Price: "500",
    details: "ghasd haghgda ahgahgda hagd",
    features: "En bn",
  },
];

const useCustomers = (page, rowsPerPage) => {
  return useMemo(() => {
    return applyPagination(data, page, rowsPerPage);
  }, [page, rowsPerPage]);
};

const useCustomerIds = (customers) => {
  return useMemo(() => {
    return customers.map((customer) => customer.id);
  }, [customers]);
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const customers = useCustomers(page, rowsPerPage);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  return (
    <>
      <Head>
        <title>Subscription</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Subscription</Typography>
              </Stack>
              <div>
                <Link href="add-subscription">
                  <Button
                    startIcon={
                      <SvgIcon fontSize="small">
                        <PlusIcon />
                      </SvgIcon>
                    }
                    variant="contained"
                    sx={{
                      background: "#00467a",
                      color: "white",
                      border: "",
                    }}
                  >
                    Add Subscription
                  </Button>
                </Link>
              </div>
            </Stack>
            <CustomersSearch />
            <CustomersTable
              count={data.length}
              items={customers}
              onDeselectAll={customersSelection.handleDeselectAll}
              onDeselectOne={customersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={customersSelection.handleSelectAll}
              onSelectOne={customersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={customersSelection.selected}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
