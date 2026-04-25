import React from "react";
import moment from "moment";
import { parseDate } from "@internationalized/date";
import { Add, Amount, Category, Title } from "../../utils/Icons";

const TransactionForm = ({
  categories,
  formData,
  button,
  btnColor,
  hasErrors,
  errors,
  isLoading,
  handleOnChange,
  handleDateChange,
  handleSubmit,
}) => {
  const { title, amount, description, category, date } = formData;
  const dateValue =
    date && typeof date === "object" && "year" in date
      ? `${date.year}-${String(date.month).padStart(2, "0")}-${String(
          date.day
        ).padStart(2, "0")}`
      : moment().format("YYYY-MM-DD");

  const buttonStyles =
    btnColor === "danger"
      ? "bg-red-500 hover:bg-red-600"
      : "bg-emerald-500 hover:bg-emerald-600";

  const baseFieldClassName =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white";

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
      <div className="w-full">
        <label
          htmlFor="transaction-title"
          className="mb-2 block text-sm font-semibold text-slate-700"
        >
          Title
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
            <Title />
          </span>
          <input
            id="transaction-title"
            type="text"
            name="title"
            value={title}
            onChange={handleOnChange}
            placeholder="Enter the title"
            className={`${baseFieldClassName} pl-12`}
          />
        </div>
        {errors?.title && (
          <p className="mt-1 text-sm text-red-500">{errors.title}</p>
        )}
      </div>

      <div className="w-full">
        <label
          htmlFor="transaction-amount"
          className="mb-2 block text-sm font-semibold text-slate-700"
        >
          Amount
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
            <Amount />
          </span>
          <input
            id="transaction-amount"
            type="number"
            name="amount"
            value={amount}
            onChange={handleOnChange}
            placeholder="Enter the amount"
            className={`${baseFieldClassName} pl-12`}
          />
        </div>
        {errors?.amount && (
          <p className="mt-1 text-sm text-red-500">{errors.amount}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="w-full">
          <label
            htmlFor="transaction-category"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Category
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
              <Category />
            </span>
            <select
              id="transaction-category"
              name="category"
              value={category}
              onChange={handleOnChange}
              className={`${baseFieldClassName} pl-12`}
            >
              <option value="">Select the category</option>
              {categories.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
          {errors?.category && (
            <p className="mt-1 text-sm text-red-500">{errors.category}</p>
          )}
        </div>

        <div className="w-full">
          <label
            htmlFor="transaction-date"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Select the date
          </label>
          <input
            id="transaction-date"
            type="date"
            value={dateValue}
            onChange={(e) => handleDateChange(parseDate(e.target.value))}
            className={baseFieldClassName}
          />
          {errors?.date && (
            <p className="mt-1 text-sm text-red-500">{errors.date}</p>
          )}
        </div>
      </div>

      <div className="w-full">
        <label
          htmlFor="transaction-description"
          className="mb-2 block text-sm font-semibold text-slate-700"
        >
          Description
        </label>
        <textarea
          id="transaction-description"
          name="description"
          value={description}
          onChange={handleOnChange}
          placeholder="Enter your description"
          rows={4}
          className={`${baseFieldClassName} min-h-32 resize-none`}
        />
        {errors?.description && (
          <p className="mt-1 text-sm text-red-500">{errors.description}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={
          isLoading ||
          !title ||
          !amount ||
          !category ||
          !date ||
          !description ||
          hasErrors
        }
        className={`mt-2 flex h-12 w-full items-center justify-center gap-3 rounded-xl text-lg font-semibold text-white transition disabled:cursor-not-allowed disabled:bg-slate-300 ${buttonStyles}`}
      >
        <Add />
        {isLoading ? "Saving..." : button}
      </button>
    </form>
  );
};

export default TransactionForm;
