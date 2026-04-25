import React, { useState, useEffect } from "react";
import { object, string, number, date } from "yup";
import { toast } from "react-toastify";
import moment from "moment";
import { parseDate } from "@internationalized/date";
import { NumericFormat } from "react-number-format";

import { useSelector } from "react-redux";
import {
  useGetExpenseQuery,
  useAddExpenseMutation,
} from "../../features/api/apiSlices/expenseApiSlice";

import { TransactionForm } from "../../components/Forms";
import validateForm from "../../utils/validateForm";
import TransactionTable from "../../components/Tables/TransactionTable";

const Expenses = () => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    description: "",
    category: "",
    date: parseDate(moment().format("YYYY-MM-DD")),
  });
  const [errors, setErrors] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const isRefetchDeleteModal = useSelector(
    (state) => state.deleteTransactionModal.refetch
  );
  const isRefetchViewAndUpdateModal = useSelector(
    (state) => state.transactionViewAndUpdateModal.refetch
  );

  const expenseCategories = [
    { label: "Groceries", value: "groceries" },
    { label: "Utilities", value: "utilities" },
    { label: "Transportation", value: "transportation" },
    { label: "Healthcare", value: "healthcare" },
    { label: "Entertainment", value: "entertainment" },
    { label: "Clothing", value: "clothing" },
    { label: "Other", value: "other" },
  ];

  const validationSchema = object({
    title: string()
      .required("Title is required.")
      .min(5, "Title must be atleast 5 characters long.")
      .max(15, "Title should not be more than 15 characters."),
    amount: number("Amount must be a number")
      .required("Amount is required.")
      .positive("Amount must be positive."),
    description: string()
      .required("Description is required.")
      .min(5, "Description must be atleast 5 characters long.")
      .max(80, "Description should not be more than 80 characters."),
    date: date().required("Date is required."),
    category: string()
      .required("Category is required.")
      .oneOf(
        [
          "groceries",
          "utilities",
          "transportation",
          "healthcare",
          "entertainment",
          "clothing",
          "other",
        ],
        "Invalid category selected."
      ),
  });

  const chipColorMap = {
    groceries: "success",
    utilities: "default",
    transportation: "success",
    healthcare: "warning",
    entertainment: "danger",
    clothing: "warning",
    other: "default",
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    const finalValue = name === "amount" ? Number(value) : value;

    setFormData((prev) => ({
      ...prev,
      [name]: finalValue,
    }));

    validateForm(name, finalValue, validationSchema, setErrors);
  };
  const handleDateChange = (newDate) => {
    setFormData({ ...formData, date: newDate });
  };

  const [addExpense, { isLoading: addExpenseLoading }] =
    useAddExpenseMutation();
  const {
    data,
    isLoading: getExpenseLoading,
    refetch,
  } = useGetExpenseQuery({
    page: currentPage,
    pageSize: 10,
  });

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const formattedDate = moment({
        year: formData.date.year,
        month: formData.date.month - 1,
        day: formData.date.day,
      }).format("YYYY-MM-DD");
      const updatedFormData = {
        ...formData,
        date: formattedDate,
      };

      const res = await addExpense(updatedFormData).unwrap();

      toast.success(res.message || "Expense added successfully!");
      setFormData({
        title: "",
        amount: "",
        description: "",
        category: "",
        date: parseDate(moment().format("YYYY-MM-DD")),
      });
      setErrors({});
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.error || "Unexpected Internal Server Error!");
    } finally {
      await refetch();
    }
  };

  useEffect(() => {
    if (isRefetchDeleteModal || isRefetchViewAndUpdateModal) {
      refetch();
    }
  }, [isRefetchDeleteModal, isRefetchViewAndUpdateModal, refetch]);

  const hasErrors = Object.values(errors).some((error) => !!error);
  const totalExpense = data?.totalExpense || 0;
  const totalPages = data?.pagination?.totalPages || 1;

  return (
    <div className="flex flex-col gap-8 p-6 max-w-[1600px] mx-auto">
      <div className="flex flex-col gap-4 bg-white p-6 rounded-2xl shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Expenses</h2>
          <p className="text-gray-500">Track and organize your spending</p>
        </div>

        <div className="text-left sm:text-right">
          <p className="text-sm text-gray-500">Total Expense</p>
          <h3 className="text-3xl font-bold text-red-500">
            $ <NumericFormat value={totalExpense} displayType="text" thousandSeparator />
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col">
            <h3 className="text-lg font-semibold mb-4">Add Expense</h3>

            <TransactionForm
              button="Add Expense"
              categories={expenseCategories}
              btnColor="danger"
              formData={formData}
              errors={errors}
              hasErrors={hasErrors}
              isLoading={addExpenseLoading}
              handleOnChange={handleOnChange}
              handleDateChange={handleDateChange}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>

        <div className="lg:col-span-8 bg-white rounded-2xl shadow-sm p-6">
          <TransactionTable
            data={data?.expenses}
            name="expense"
            rowsPerPage={10}
            chipColorMap={chipColorMap}
            isLoading={getExpenseLoading}
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Expenses;
