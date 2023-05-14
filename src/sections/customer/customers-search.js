import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { Card, InputAdornment, OutlinedInput, SvgIcon } from "@mui/material";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";

export const CustomersSearch = () => (
  <Card sx={{ p: 2 }}>
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="space-between" spacing={4}>
        <Stack spacing={1}>
          <Stack alignItems="center" direction="row" spacing={1}>
            <Button
              color="inherit"
              startIcon={
                <SvgIcon fontSize="small">
                  <ArrowUpOnSquareIcon />
                </SvgIcon>
              }
            >
              Import
            </Button>
            <Button
              color="inherit"
              startIcon={
                <SvgIcon fontSize="small">
                  <ArrowDownOnSquareIcon />
                </SvgIcon>
              }
            >
              Export
            </Button>
          </Stack>
        </Stack>

        <OutlinedInput
          defaultValue=""
          fullWidth
          placeholder="Search customer"
          startAdornment={
            <InputAdornment position="start">
              <SvgIcon color="action" fontSize="small">
                <MagnifyingGlassIcon />
              </SvgIcon>
            </InputAdornment>
          }
          sx={{ maxWidth: 500, float: "right" }}
        />
      </Stack>
    </Stack>
  </Card>
);
