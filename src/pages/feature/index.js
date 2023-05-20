import { useCallback, useMemo, useState,useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { FeatureTable } from "src/sections/customer/feature-table";
import { CustomersSearch } from "src/sections/customer/customers-search";
import { applyPagination } from "src/utils/apply-pagination";
 import { ADD_SUBSCRIPTION } from '../../common/constantData/language';
import { FEATURE } from '../../common/constantData/language';
import { fetchFeatureAPIGet } from '../../common/apiCall/api';

const now = new Date();

const data = [
  {
    id: "1",
    name: "free 1",
    
  },
  {
    id: "2",
    name: "free 1",
  },
  {
    id: "3",
    name: "free 1",
  },
  {
    id: "4",
    name: "free 1",
  },
  {
    id: "5",
    name: "free 1",
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
  const [featureList, setFeatureList] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchFeatureAPIGet();
        setFeatureList(data?.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

console.log(featureList,"featureList")
  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  return (
    <>
      <Head>
        <title>{FEATURE.TITLE}</title>
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
                <Typography variant="h4">{FEATURE.TITLE}</Typography>
              </Stack>
              <div>
                <Link href="add-feature">
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
                    {FEATURE.Feature_Add_Button}
                  </Button>
                </Link>
              </div>
            </Stack>
            <CustomersSearch />
            <FeatureTable
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
