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
import { CouponTable } from "src/sections/customer/coupon-table";
import { CustomersSearch } from "src/sections/customer/customers-search";
import { applyPagination } from "src/utils/apply-pagination";

const now = new Date();

const data = [
  {
    id: "1",
    code: "Ad001sd",
    amount: "1500",
    amount_type: "percentage",
    start_date: "12-04-2023",
    expire_date: "12-04-2023",
    user_type: "All",
    subscription_plan_type: "all",
  },
  {
    id: "2",
    code: "Ad001sd",
    amount: "1500",
    amount_type: "percentage",
    start_date: "12-04-2023",
    expire_date: "12-04-2023",
    user_type: "All",
    subscription_plan_type: "all",
  },
  {
    id: "3",
    code: "Ad001sd",
    amount: "1500",
    amount_type: "percentage",
    start_date: "12-04-2023",
    expire_date: "12-04-2023",
    user_type: "All",
    subscription_plan_type: "all",
  },
  {
    id: "4",
    code: "Ad001sd",
    amount: "1500",
    amount_type: "percentage",
    start_date: "12-04-2023",
    expire_date: "12-04-2023",
    user_type: "All",
    subscription_plan_type: "all",
  },
  {
    id: "5",
    code: "Ad001sd",
    amount: "1500",
    amount_type: "percentage",
    start_date: "12-04-2023",
    expire_date: "12-04-2023",
    user_type: "All",
    subscription_plan_type: "all",
  },
  {
    id: "6",
    code: "Ad001sd",
    amount: "1500",
    amount_type: "percentage",
    start_date: "12-04-2023",
    expire_date: "12-04-2023",
    user_type: "All",
    subscription_plan_type: "all",
  },
  {
    id: "7",
    code: "Ad001sd",
    amount: "1500",
    amount_type: "percentage",
    start_date: "12-04-2023",
    expire_date: "12-04-2023",
    user_type: "All",
    subscription_plan_type: "all",
  },
  {
    id: "8",
    code: "Ad001sd",
    amount: "1500",
    amount_type: "percentage",
    start_date: "12-04-2023",
    expire_date: "12-04-2023",
    user_type: "All",
    subscription_plan_type: "all",
  },
  {
    id: "9",
    code: "Ad001sd",
    amount: "1500",
    amount_type: "percentage",
    start_date: "12-04-2023",
    expire_date: "12-04-2023",
    user_type: "All",
    subscription_plan_type: "all",
  },
  {
    id: "10",
    code: "Ad001sd",
    amount: "1500",
    amount_type: "percentage",
    start_date: "12-04-2023",
    expire_date: "12-04-2023",
    user_type: "All",
    subscription_plan_type: "all",
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
        <title>Coupon</title>
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
                <Typography variant="h4">Coupon</Typography>
              </Stack>
              <div>
                <Link href="add-cupon">
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
                    Add Coupon
                  </Button>
                </Link>
              </div>
            </Stack>
            <CustomersSearch />
            <CouponTable
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
