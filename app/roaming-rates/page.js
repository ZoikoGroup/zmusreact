"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import React, { useState, useEffect } from "react";
import { Container, Table, Form, Row, Col, Pagination } from "react-bootstrap";

export default function FreeInternationalMinutes() {
  const [search, setSearch] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const data = [
  { destination: "Afghanistan", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Airline Services", per_mb: "$ 18.73", rounding_mb: "10 KB", per_minute: "$ 3.51", rounding_minute: "1 min", per_sms: "$ 0.05" },
  { destination: "Aland Islands", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Albania", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.14", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Alderney", per_mb: "$ 0.02", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.02" },
  { destination: "Algeria", per_mb: "$ 0.03", rounding_mb: "10 KB", per_minute: "$ 0.06", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "American Samoa", per_mb: "$ 0.26", rounding_mb: "10 KB", per_minute: "$ 0.23", rounding_minute: "1 min", per_sms: "$ 0.18" },
  { destination: "Andorra", per_mb: "$ 0.02", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.02" },
  { destination: "Angola", per_mb: "$ 0.16", rounding_mb: "10 KB", per_minute: "$ 1.72", rounding_minute: "1 min", per_sms: "$ 0.05" },
  { destination: "Anguilla", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Antigua and Barbuda", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Argentina", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Armenia", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Aruba", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Ascension Island", per_mb: "$ 0.16", rounding_mb: "10 KB", per_minute: "$ 4.32", rounding_minute: "1 min", per_sms: "$ 0.72" },
  { destination: "Australia", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Austria", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Azerbaijan", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.15", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Azores", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Bahamas", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Bahrain", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Bangladesh", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Barbados", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Belarus", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Belgium", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Belize", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.06", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Benin", per_mb: "$ 0.03", rounding_mb: "10 KB", per_minute: "$ 0.25", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Bermuda", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Bhutan", per_mb: "$ 16.09", rounding_mb: "10 KB", per_minute: "$ 3.31", rounding_minute: "1 min", per_sms: "$ 0.47" },
  { destination: "Bolivia", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Bonaire", per_mb: "$ 0.02", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.02" },
  { destination: "Bosnia and Herzegovina", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Botswana", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Brazil", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "British Virgin Islands", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Brunei", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.26", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Bulgaria", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Burkina Faso", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Burundi", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.20", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Cambodia", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.06", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Cameroon", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Canada", per_mb: "$ 0.01", rounding_mb: "1 KB", per_minute: "$ 0.01", rounding_minute: "1 min", per_sms: "$ 0.00" },
  { destination: "Canary Islands", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Cape Verde", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Cayman Islands", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Central African Republic", per_mb: "$ 0.02", rounding_mb: "10 KB", per_minute: "$ 0.22", rounding_minute: "1 min", per_sms: "$ 0.04" },
  { destination: "Chad", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Chile", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "China", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Christmas Island", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Colombia", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Comoros", per_mb: "$ 0.73", rounding_mb: "10 KB", per_minute: "$ 5.82", rounding_minute: "1 min", per_sms: "$ 0.20" },
  { destination: "Cook Islands", per_mb: "$ 8.06", rounding_mb: "10 KB", per_minute: "$ 6.76", rounding_minute: "1 min", per_sms: "$ 0.79" },
  { destination: "Costa Rica", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Cote D'Ivoire", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Croatia", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Cuba", per_mb: "$ 1.72", rounding_mb: "10 KB", per_minute: "$ 2.59", rounding_minute: "1 min", per_sms: "$ 0.08" },
  { destination: "Curacao", per_mb: "$ 0.02", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.02" },
  { destination: "Cyprus", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Czech Republic", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Democratic Republic of Congo", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Denmark", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Djibouti", per_mb: "$ 0.33", rounding_mb: "10 KB", per_minute: "$ 0.33", rounding_minute: "1 min", per_sms: "$ 0.33" },
  { destination: "Dominica", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Dominican Republic", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Easter Island", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.06", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Ecuador", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Egypt", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.12", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "El Salvador", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "England", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Equatorial Guinea", per_mb: "$ 0.16", rounding_mb: "10 KB", per_minute: "$ 0.61", rounding_minute: "1 min", per_sms: "$ 0.03" },
  { destination: "Eritrea", per_mb: "$ 0.73", rounding_mb: "10 KB", per_minute: "$ 5.82", rounding_minute: "1 min", per_sms: "$ 0.20" },
  { destination: "Estonia", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Eswatini", per_mb: "$ 0.03", rounding_mb: "10 KB", per_minute: "$ 0.52", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Ethiopia", per_mb: "$ 0.13", rounding_mb: "10 KB", per_minute: "$ 2.13", rounding_minute: "1 min", per_sms: "$ 0.06" },
  { destination: "Falkland Islands", per_mb: "$ 0.73", rounding_mb: "10 KB", per_minute: "$ 5.82", rounding_minute: "1 min", per_sms: "$ 0.20" },
  { destination: "Faroe Islands", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.05", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Fiji", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.13", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Finland", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "France", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "French Guiana", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "French Polynesia", per_mb: "$ 0.02", rounding_mb: "10 KB", per_minute: "$ 0.04", rounding_minute: "1 min", per_sms: "$ 0.02" },
  { destination: "French West Indies", per_mb: "$ 0.73", rounding_mb: "10 KB", per_minute: "$ 5.82", rounding_minute: "1 min", per_sms: "$ 0.20" },
  { destination: "Gabon", per_mb: "$ 0.02", rounding_mb: "10 KB", per_minute: "$ 0.52", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Gambia", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Georgia", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.13", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Germany", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Ghana", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Gibraltar", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.06", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Greece", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Greenland", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Grenada", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.05", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Guadeloupe", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Guam", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.13", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Guatemala", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Guernsey", per_mb: "$ 0.02", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.02" },
  { destination: "Guinea", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.03" },
  { destination: "Guinea-Bissau", per_mb: "$ 0.02", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.03" },
  { destination: "Guyana", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.02" },
  { destination: "Haiti", per_mb: "$ 0.02", rounding_mb: "10 KB", per_minute: "$ 0.04", rounding_minute: "1 min", per_sms: "$ 0.02" },
  { destination: "Herm", per_mb: "$ 0.02", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.02" },
  { destination: "Honduras", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Hong Kong", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Hungary", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Iceland", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.15", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "India", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Indonesia", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Iraq", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Ireland", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Isle of Man", per_mb: "$ 0.02", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.02" },
  { destination: "Israel", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.10", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Italy", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Jamaica", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.04", rounding_minute: "1 min", per_sms: "$ 0.02" },
  { destination: "Japan", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.06", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Jersey", per_mb: "$ 0.02", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.02" },
  { destination: "Jordan", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Kazakhstan", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Kenya", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Kiribati", per_mb: "$ 0.73", rounding_mb: "10 KB", per_minute: "$ 5.82", rounding_minute: "1 min", per_sms: "$ 0.20" },
  { destination: "Kosovo", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.32", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Kuwait", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.05", rounding_minute: "1 min", per_sms: "$ 0.02" },
  { destination: "Kyrgyzstan", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Laos", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.23", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Latvia", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.05", rounding_minute: "1 min", per_sms: "$ 0.04" },
  { destination: "Lebanon", per_mb: "$ 0.58", rounding_mb: "10 KB", per_minute: "$ 1.13", rounding_minute: "1 min", per_sms: "$ 0.06" },
  { destination: "Lesotho", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.03" },
  { destination: "Liberia", per_mb: "$ 0.02", rounding_mb: "10 KB", per_minute: "$ 0.04", rounding_minute: "1 min", per_sms: "$ 0.17" },
  { destination: "Libya", per_mb: "$ 13.92", rounding_mb: "10 KB", per_minute: "$ 5.05", rounding_minute: "1 min", per_sms: "$ 0.86" },
  { destination: "Liechtenstein", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Lithuania", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.02" },
  { destination: "Luxembourg", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Macau", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Macedonia", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.11", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Madagascar", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Madeira", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Malawi", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Malaysia", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Maldives", per_mb: "$ 0.07", rounding_mb: "10 KB", per_minute: "$ 0.07", rounding_minute: "1 min", per_sms: "$ 0.07" },
  { destination: "Mali", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.03" },
  { destination: "Malta", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Marie Galante", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Maritime Services", per_mb: "$ 0.73", rounding_mb: "10 KB", per_minute: "$ 7.01", rounding_minute: "1 min", per_sms: "$ 0.27" },
  { destination: "Marshall Islands", per_mb: "$ 0.73", rounding_mb: "10 KB", per_minute: "$ 5.82", rounding_minute: "1 min", per_sms: "$ 0.20" },
  { destination: "Martinique", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Mauritania", per_mb: "$ 0.02", rounding_mb: "10 KB", per_minute: "$ 1.15", rounding_minute: "1 min", per_sms: "$ 0.12" },
  { destination: "Mauritius", per_mb: "$ 0.02", rounding_mb: "10 KB", per_minute: "$ 0.05", rounding_minute: "1 min", per_sms: "$ 0.02" },
  { destination: "Mayotte", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Mexico", per_mb: "$ 0.01", rounding_mb: "1 KB", per_minute: "$ 0.01", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Micronesia", per_mb: "$ 1.29", rounding_mb: "10 KB", per_minute: "$ 0.65", rounding_minute: "1 min", per_sms: "$ 0.78" },
  { destination: "Moldova", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.05", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Monaco", per_mb: "$ 0.04", rounding_mb: "10 KB", per_minute: "$ 0.19", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Mongolia", per_mb: "$ 0.02", rounding_mb: "10 KB", per_minute: "$ 0.48", rounding_minute: "1 min", per_sms: "$ 0.02" },
  { destination: "Montenegro", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Montserrat", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Morocco", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.09", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Mozambique", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Myanmar", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.20", rounding_minute: "1 min", per_sms: "$ 0.11" },
  { destination: "Namibia", per_mb: "$ 1.73", rounding_mb: "10 KB", per_minute: "$ 0.71", rounding_minute: "1 min", per_sms: "$ 0.14" },
  { destination: "Nauru", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.12", rounding_minute: "1 min", per_sms: "$ 0.03" },
  { destination: "Nepal", per_mb: "$ 0.02", rounding_mb: "10 KB", per_minute: "$ 0.15", rounding_minute: "1 min", per_sms: "$ 0.02" },
  { destination: "Netherlands", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.14", rounding_minute: "1 min", per_sms: "$ 0.23" },
  { destination: "New Caledonia", per_mb: "$ 18.54", rounding_mb: "10 KB", per_minute: "$ 4.25", rounding_minute: "1 min", per_sms: "$ 0.12" },
  { destination: "New Zealand", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.04", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Nicaragua", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Niger", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.07", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Nigeria", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.04", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Northern Ireland", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Northern Mariana Islands", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.13", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Norway", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Oman", per_mb: "$ 0.02", rounding_mb: "10 KB", per_minute: "$ 0.08", rounding_minute: "1 min", per_sms: "$ 0.02" },
  { destination: "Pakistan", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.04", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Palau", per_mb: "$ 0.03", rounding_mb: "10 KB", per_minute: "$ 0.78", rounding_minute: "1 min", per_sms: "$ 0.26" },
  { destination: "Palestinian Territories", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Panama", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Papua New Guinea", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.14", rounding_minute: "1 min", per_sms: "$ 0.03" },
  { destination: "Paraguay", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Peru", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Philippines", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Poland", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Portugal", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Qatar", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Republic of Congo", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Reunion", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Romania", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Rota", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.13", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Russia", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.09", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Rwanda", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.03" },
  { destination: "Saba", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.07", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Saint Barthelemy", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Saint Helena", per_mb: "$ 0.16", rounding_mb: "10 KB", per_minute: "$ 4.32", rounding_minute: "1 min", per_sms: "$ 0.72" },
  { destination: "Saint Kitts and Nevis", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Saint Lucia", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.05", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Saint Martin", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Saint Pierre and Miquelon", per_mb: "$ 0.73", rounding_mb: "10 KB", per_minute: "$ 2.58", rounding_minute: "1 min", per_sms: "$ 0.12" },
  { destination: "Saint Vincent and the Grenadines", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Saipan", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.13", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Samoa", per_mb: "$ 0.02", rounding_mb: "10 KB", per_minute: "$ 0.09", rounding_minute: "1 min", per_sms: "$ 0.03" },
  { destination: "San Marino", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Sao Tome and Principe", per_mb: "$ 0.13", rounding_mb: "10 KB", per_minute: "$ 2.13", rounding_minute: "1 min", per_sms: "$ 0.04" },
  { destination: "Sark Island", per_mb: "$ 0.02", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.02" },
  { destination: "Saudi Arabia", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Scotland", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Senegal", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Serbia", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.14", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Seychelles", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.06", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Sierra Leone", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Singapore", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Sint Eustatius", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.07", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Sint Maarten", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.07", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Slovakia", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Slovenia", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Solomon Islands", per_mb: "$ 0.73", rounding_mb: "10 KB", per_minute: "$ 5.82", rounding_minute: "1 min", per_sms: "$ 0.20" },
  { destination: "Somalia", per_mb: "$ 0.73", rounding_mb: "10 KB", per_minute: "$ 5.82", rounding_minute: "1 min", per_sms: "$ 0.20" },
  { destination: "South Africa", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "South Korea", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "South Sudan", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.35", rounding_minute: "1 min", per_sms: "$ 0.04" },
  { destination: "Spain", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Sri Lanka", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Sudan", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.06", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Suriname", per_mb: "$ 0.02", rounding_mb: "10 KB", per_minute: "$ 0.04", rounding_minute: "1 min", per_sms: "$ 0.02" },
  { destination: "Svalbard", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Sweden", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Switzerland", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.06", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Taiwan", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Tajikistan", per_mb: "$ 0.02", rounding_mb: "10 KB", per_minute: "$ 0.16", rounding_minute: "1 min", per_sms: "$ 0.03" },
  { destination: "Tanzania", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Thailand", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Timor-Leste", per_mb: "$ 0.73", rounding_mb: "10 KB", per_minute: "$ 5.82", rounding_minute: "1 min", per_sms: "$ 0.20" },
  { destination: "Tinian", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.13", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Togo", per_mb: "$ 0.03", rounding_mb: "10 KB", per_minute: "$ 0.08", rounding_minute: "1 min", per_sms: "$ 0.02" },
  { destination: "Tonga", per_mb: "$ 0.02", rounding_mb: "10 KB", per_minute: "$ 0.10", rounding_minute: "1 min", per_sms: "$ 0.03" },
  { destination: "Trinidad and Tobago", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.02" },
  { destination: "Tunisia", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Turkey", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Turkmenistan", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 4.86", rounding_minute: "1 min", per_sms: "$ 0.28" },
  { destination: "Turks and Caicos Islands", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Tuvalu", per_mb: "$ 0.73", rounding_mb: "10 KB", per_minute: "$ 5.82", rounding_minute: "1 min", per_sms: "$ 0.20" },
  { destination: "Uganda", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Ukraine", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "United Arab Emirates", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "United Kingdom", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Uruguay", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.05", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Uzbekistan", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.02" },
  { destination: "Vanuatu", per_mb: "$ 0.02", rounding_mb: "10 KB", per_minute: "$ 0.24", rounding_minute: "1 min", per_sms: "$ 0.03" },
  { destination: "Vatican City", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Venezuela", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.09", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Vietnam", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Wales", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Western Sahara", per_mb: "$ 0.00", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Yemen", per_mb: "$ 0.02", rounding_mb: "10 KB", per_minute: "$ 0.69", rounding_minute: "1 min", per_sms: "$ 0.07" },
  { destination: "Zambia", per_mb: "$ 0.01", rounding_mb: "10 KB", per_minute: "$ 0.03", rounding_minute: "1 min", per_sms: "$ 0.01" },
  { destination: "Zimbabwe", per_mb: "$ 0.34", rounding_mb: "10 KB", per_minute: "$ 0.67", rounding_minute: "1 min", per_sms: "$ 0.26" }
];

  // filter
  const filteredData = data.filter((row) =>
    row.destination.toLowerCase().includes(search.toLowerCase())
  );

  // pagination setup
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + entriesPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [search, entriesPerPage]);

  // helper to generate nice compact pagination
  const renderPaginationItems = () => {
    const items = [];
    const visiblePages = 3; // number of pages visible around current

    if (totalPages <= 7) {
      // small number of pages - show all
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <Pagination.Item
            key={i}
            active={i === currentPage}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </Pagination.Item>
        );
      }
    } else {
      // large number of pages
      items.push(
        <Pagination.Item
          key={1}
          active={1 === currentPage}
          onClick={() => handlePageChange(1)}
        >
          1
        </Pagination.Item>
      );

      if (currentPage > visiblePages + 1) {
        items.push(<Pagination.Ellipsis key="start-ellipsis" disabled />);
      }

      // middle pages
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        items.push(
          <Pagination.Item
            key={i}
            active={i === currentPage}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </Pagination.Item>
        );
      }

      if (currentPage < totalPages - visiblePages) {
        items.push(<Pagination.Ellipsis key="end-ellipsis" disabled />);
      }

      items.push(
        <Pagination.Item
          key={totalPages}
          active={totalPages === currentPage}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </Pagination.Item>
      );
    }

    return items;
  };

  return (
    <>

      <Header />
      <HeadBar text="Zoiko Mobile SIM Activation" />

      <Container className="py-5">
        <h3 className="text-center text-danger fw-bold mb-3">
          Free International Minutes
        </h3>

        <p className="text-center fs-5">
          Find the best rates for your destination
        </p>

        <Row className="align-items-center mb-3">
          <Col xs="auto">
            <Form.Select
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(parseInt(e.target.value))}
              style={{ width: "80px" }}
            >
              {[10, 25, 50, 100].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col>
            <span>entries per page</span>
          </Col>
          <Col className="text-end">
            <Form.Control
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ maxWidth: "250px", display: "inline-block" }}
            />
          </Col>
        </Row>

        <Table bordered hover responsive className="align-middle">
          <thead style={{ backgroundColor: "#e72b63", color: "#fff" }}>
            <tr>
              <th style={{ backgroundColor: "#e91e63", color: "#fff",textAlign:"center" }}>Country</th>
              <th style={{ backgroundColor: "#e91e63", color: "#fff",textAlign:"center" }}>Per $ MB</th>
              <th style={{ backgroundColor: "#e91e63", color: "#fff",textAlign:"center" }}>Rounding MB</th>
              <th style={{ backgroundColor: "#e91e63", color: "#fff",textAlign:"center" }}>Per $ Minute</th>
              <th style={{ backgroundColor: "#e91e63", color: "#fff",textAlign:"center" }}>Rounding Minute</th>
              <th style={{ backgroundColor: "#e91e63", color: "#fff",textAlign:"center" }}>Per $ SMS</th>
            </tr>
          </thead>
          <tbody  style={{textAlign:"center" }}>
            {currentData.length > 0 ? (
              currentData.map((row, index) => (
                <tr key={index} style={{ backgroundColor: "#f8f9fa" }}>


                  <td>{row.destination}</td>
                  <td>{row.per_mb}</td>
                  <td>{row.rounding_mb}</td>
                  <td>{row.per_minutes}</td>
                  <td>{row.rounding_minute}</td>
                  <td>{row.per_sms}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-3">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-3">
            <Pagination>
              <Pagination.Prev
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              />
              {renderPaginationItems()}
              <Pagination.Next
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              />
            </Pagination>
          </div>
        )}
      </Container>

      <Footer />
    </>
  );
}
