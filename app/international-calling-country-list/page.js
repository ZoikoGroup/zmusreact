"use client";

import TopHeader from "../components/TopHeader";
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
  { destination: "Afghanistan", minutes: 30 },
  { destination: "Afghanistan - Cellular", minutes: 40 },
  { destination: "Albania", minutes: 45 },
  { destination: "Albania - Cellular", minutes: 15 },
  { destination: "Algeria", minutes: 115 },
  { destination: "Algeria - Cellular", minutes: 10 },
  { destination: "American Samoa", minutes: 60 },
  { destination: "American Samoa - Cellular", minutes: 85 },
  { destination: "Andorra", minutes: 185 },
  { destination: "Andorra - Cellular", minutes: 30 },
  { destination: "Angola", minutes: 30 },
  { destination: "Angola - Cellular", minutes: 20 },
  { destination: "Anguilla", minutes: 30 },
  { destination: "Anguilla - Cellular", minutes: 30 },
  { destination: "Antigua and Barbuda", minutes: 30 },
  { destination: "Antigua and Barbuda - Cellular", minutes: 30 },
  { destination: "Argentina", minutes: 1000 },
  { destination: "Argentina - Buenos Aires", minutes: 1000 },
  { destination: "Argentina - Cellular", minutes: 100 },
  { destination: "Armenia", minutes: 40 },
  { destination: "Armenia - Cellular", minutes: 30 },
  { destination: "Armenia - Yerevan", minutes: 40 },
  { destination: "Aruba", minutes: 80 },
  { destination: "Aruba - Cellular", minutes: 30 },
  { destination: "Ascension Island", minutes: 5 },
  { destination: "Australia", minutes: 875 },
  { destination: "Australia - Cellular", minutes: 480 },
  { destination: "Austria", minutes: 185 },
  { destination: "Austria - Cellular", minutes: 30 },
  { destination: "Austria - Cellular - Special", minutes: 25 },
  { destination: "Azerbaijan", minutes: 35 },
  { destination: "Azerbaijan - Cellular", minutes: 20 },
  { destination: "Bahamas", minutes: 30 },
  { destination: "Bahamas - Cellular", minutes: 30 },
  { destination: "Bahrain", minutes: 65 },
  { destination: "Bahrain - Cellular", minutes: 55 },
  { destination: "Bangladesh", minutes: 440 },
  { destination: "Bangladesh - Cellular", minutes: 410 },
  { destination: "Barbados", minutes: 35 },
  { destination: "Barbados - Cellular", minutes: 30 },
  { destination: "Belarus", minutes: 20 },
  { destination: "Belarus - Cellular", minutes: 20 },
  { destination: "Belgium", minutes: 285 },
  { destination: "Belgium - Cellular", minutes: 20 },
  { destination: "Belgium - Cellular - Other", minutes: 15 },
  { destination: "Belize", minutes: 30 },
  { destination: "Belize - Cellular", minutes: 30 },
  { destination: "Benin", minutes: 20 },
  { destination: "Benin - Cellular", minutes: 20 },
  { destination: "Bermuda", minutes: 460 },
  { destination: "Bermuda - Cellular", minutes: 475 },
  { destination: "Bhutan", minutes: 120 },
  { destination: "Bhutan - Cellular", minutes: 120 },
  { destination: "Bolivia", minutes: 35 },
  { destination: "Bolivia - Cellular", minutes: 40 },
  { destination: "Bolivia - Cochabamba", minutes: 75 },
  { destination: "Bolivia - Equal Access", minutes: 55 },
  { destination: "Bolivia - La Paz", minutes: 80 },
  { destination: "Bolivia - Rural", minutes: 80 },
  { destination: "Bolivia - Santa Cruz", minutes: 70 },
  { destination: "Bosnia and Herzegovina", minutes: 45 },
  { destination: "Bosnia and Herzegovina - Cellular", minutes: 15 },
  { destination: "Botswana", minutes: 40 },
  { destination: "Botswana - Cellular", minutes: 30 },
  { destination: "Brazil", minutes: 1000 },
  { destination: "Brazil - Cellular", minutes: 915 },
  { destination: "Brazil - Rio de Janeiro", minutes: 1000 },
  { destination: "Brazil - Sao Paulo", minutes: 1000 },
  { destination: "British Virgin Islands", minutes: 30 },
  { destination: "British Virgin Islands - Cellular", minutes: 30 },
  { destination: "Brunei", minutes: 30 },
  { destination: "Brunei - Cellular", minutes: 155 },
  { destination: "Bulgaria", minutes: 295 },
  { destination: "Bulgaria - Cellular", minutes: 50 },
  { destination: "Burkina Faso", minutes: 20 },
  { destination: "Burkina Faso - Cellular - Celtel", minutes: 20 },
  { destination: "Burkina Faso - Cellular - Telecel", minutes: 30 },
  { destination: "Burkina Faso - Cellular - Telmob", minutes: 15 },
  { destination: "Burundi", minutes: 15 },
  { destination: "Burundi - Cellular", minutes: 15 },
  { destination: "Cambodia", minutes: 125 },
  { destination: "Cambodia - Cellular", minutes: 135 },
  { destination: "Cameroon", minutes: 60 },
  { destination: "Cameroon - Cellular - MTN", minutes: 20 },
  { destination: "Cameroon - Cellular - Orange", minutes: 20 },
  { destination: "Canada", minutes: 1000 },
  { destination: "Canada - Northern Territories", minutes: 85 },
  { destination: "Cape Verde", minutes: 45 },
  { destination: "Cape Verde - Cellular", minutes: 30 },
  { destination: "Cayman Islands", minutes: 145 },
  { destination: "Cayman Islands - Cellular", minutes: 40 },
  { destination: "Central African Republic", minutes: 10 },
  { destination: "Central African Republic - Cellular", minutes: 10 },
  { destination: "Chad", minutes: 15 },
  { destination: "Chad - Cellular", minutes: 15 },
  { destination: "Chile", minutes: 875 },
  { destination: "Chile - Cellular", minutes: 915 },
  { destination: "Chile - Rural", minutes: 10 },
  { destination: "Chile - Santiago", minutes: 875 },
  { destination: "China", minutes: 235 },
  { destination: "China - Cellular", minutes: 320 },
  { destination: "Colombia", minutes: 965 },
  { destination: "Colombia - Cellular", minutes: 1000 },
  { destination: "Colombia - Cellular - Comcel", minutes: 1000 },
  { destination: "Colombia - Manizales", minutes: 965 },
  { destination: "Colombia - Medellin", minutes: 950 },
  { destination: "Colombia - Pereira", minutes: 900 },
  { destination: "Colombia - Rural", minutes: 965 },
  { destination: "Comoros", minutes: 15 },
  { destination: "Comoros - Cellular", minutes: 10 },
  { destination: "Congo", minutes: 10 },
  { destination: "Congo - Cellular", minutes: 15 },
  { destination: "Cook Islands", minutes: 5 },
  { destination: "Costa Rica", minutes: 440 },
  { destination: "Costa Rica - Cellular", minutes: 135 },
  { destination: "Croatia", minutes: 100 },
  { destination: "Croatia - Cellular", minutes: 15 },
  { destination: "Cuba", minutes: 10 },
  { destination: "Cuba - Cellular", minutes: 10 },
  { destination: "Cyprus", minutes: 60 },
  { destination: "Cyprus - Cellular", minutes: 30 },
  { destination: "Czech Republic", minutes: 425 },
  { destination: "Czech Republic - Cellular", minutes: 220 },
  { destination: "Democratic Republic Congo", minutes: 20 },
  { destination: "Democratic Republic Congo - Cellular", minutes: 15 },
  { destination: "Denmark", minutes: 25 },
  { destination: "Denmark - Cellular", minutes: 105 },
  { destination: "Diego Garcia", minutes: 5 },
  { destination: "Djibouti", minutes: 20 },
  { destination: "Djibouti - Cellular", minutes: 20 },
  { destination: "Dominica", minutes: 30 },
  { destination: "Dominica - Cellular", minutes: 35 },
  { destination: "Dominican Republic", minutes: 225 },
  { destination: "Dominican Republic - Cellular", minutes: 70 },
  { destination: "East Timor", minutes: 20 },
  { destination: "Ecuador", minutes: 55 },
  { destination: "Ecuador - Cellular - Alegro", minutes: 30 },
  { destination: "Ecuador - Cellular - Movistar", minutes: 55 },
  { destination: "Ecuador - Cellular - Porta", minutes: 40 },
  { destination: "Egypt", minutes: 70 },
  { destination: "Egypt - Cellular - Etisalat", minutes: 95 },
  { destination: "Egypt - Cellular - Other", minutes: 50 },
  { destination: "El Salvador", minutes: 65 },
  { destination: "El Salvador - Cellular - CTE", minutes: 70 },
  { destination: "El Salvador - Cellular - Digicell", minutes: 70 },
  { destination: "El Salvador - Cellular - Other", minutes: 55 },
  { destination: "El Salvador - Cellular - Telefonica", minutes: 70 },
  { destination: "El Salvador - Cellular - Tmovil", minutes: 65 },
  { destination: "El Salvador - CTE S.A.", minutes: 100 },
  { destination: "El Salvador - Telefonica", minutes: 70 },
  { destination: "Equatorial Guinea", minutes: 15 },
  { destination: "Equatorial Guinea - Cellular", minutes: 15 },
  { destination: "Eritrea", minutes: 30 },
  { destination: "Eritrea - Cellular", minutes: 30 },
  { destination: "Estonia", minutes: 1000 },
  { destination: "Estonia - Cellular", minutes: 20 },
  { destination: "Estonia - Premium Services", minutes: 20 },
  { destination: "Ethiopia", minutes: 30 },
  { destination: "Ethiopia - Addis Ababa", minutes: 30 },
  { destination: "Ethiopia - Addis Ababa (Cellular)", minutes: 40 },
  { destination: "Ethiopia - Cellular", minutes: 40 },
  { destination: "Falkland Islands", minutes: 10 },
  { destination: "Faroe Islands", minutes: 330 },
  { destination: "Faroe Islands - Cellular", minutes: 275 },
  { destination: "Fiji Islands", minutes: 30 },
  { destination: "Fiji Islands - Cellular", minutes: 25 },
  { destination: "Finland", minutes: 45 },
  { destination: "Finland - Cellular", minutes: 95 },
  { destination: "France", minutes: 60 },
  { destination: "France - Cellular", minutes: 325 },
  { destination: "France - Cellular - Globalstar", minutes: 20 },
  { destination: "French Guiana", minutes: 605 },
  { destination: "French Guiana - Cellular", minutes: 65 },
  { destination: "French Polynesia", minutes: 40 },
  { destination: "French Polynesia - Cellular", minutes: 30 },
  { destination: "Gabon", minutes: 20 },
  { destination: "Gabon - Cellular", minutes: 15 },
  { destination: "Gambia", minutes: 10 },
  { destination: "Gambia - Cellular", minutes: 15 },
  { destination: "Georgia", minutes: 45 },
  { destination: "Georgia - Cellular", minutes: 25 },
  { destination: "Germany", minutes: 1000 },
  { destination: "Germany - Cellular", minutes: 115 },
  { destination: "Germany - Cellular - E Plus", minutes: 20 },
  { destination: "Ghana", minutes: 25 },
  { destination: "Ghana - Cellular - MTN", minutes: 35 },
  { destination: "Ghana - Cellular - Other", minutes: 35 },
  { destination: "Ghana - Cellular - Vodafone", minutes: 50 },
  { destination: "Gibraltar", minutes: 230 },
  { destination: "Gibraltar - Cellular", minutes: 50 },
  { destination: "GMSS", minutes: 5 },
  { destination: "Greece", minutes: 1000 },
  { destination: "Greece - Cellular", minutes: 600 },
  { destination: "Greenland", minutes: 30 },
  { destination: "Grenada", minutes: 70 },
  { destination: "Grenada - Cellular", minutes: 35 },
  { destination: "Guadeloupe", minutes: 650 },
  { destination: "Guadeloupe - Cellular", minutes: 35 },
  { destination: "Guam", minutes: 330 },
  { destination: "Guam - Cellular", minutes: 340 },
  { destination: "Guantanamo Bay", minutes: 10 },
  { destination: "Guatemala", minutes: 95 },
  { destination: "Guatemala - Cellular - Comcel", minutes: 45 },
  { destination: "Guatemala - Cellular - Sercom/Claro", minutes: 60 },
  { destination: "Guatemala - Cellular - Telefonica", minutes: 60 },
  { destination: "Guinea", minutes: 15 },
  { destination: "Guinea - Bissau", minutes: 10 },
  { destination: "Guinea - Cellular - Areeba", minutes: 15 },
  { destination: "Guinea - Cellular - Cellcom", minutes: 20 },
  { destination: "Guinea - Cellular - Intercel", minutes: 15 },
  { destination: "Guinea - Cellular - Orange", minutes: 15 },
  { destination: "Guinea - Cellular - Sotelgui", minutes: 15 },
  { destination: "Guyana", minutes: 30 },
  { destination: "Guyana - Cellular - Digicel", minutes: 40 },
  { destination: "Guyana - Cellular - Other", minutes: 30 },
  { destination: "Haiti", minutes: 25 },
  { destination: "Haiti - Cellular - Digicel", minutes: 40 },
  { destination: "Haiti - Cellular - Other", minutes: 45 },
  { destination: "Honduras", minutes: 55 },
  { destination: "Honduras - Cellular - Celtel", minutes: 45 },
  { destination: "Honduras - Cellular - Claro", minutes: 60 },
  { destination: "Honduras - Cellular - Digicel", minutes: 55 },
  { destination: "Honduras - Cellular - Hondutel", minutes: 50 },
  { destination: "Honduras - Cellular - Megatel", minutes: 55 },
  { destination: "Hong Kong", minutes: 315 },
  { destination: "Hong Kong - Cellular", minutes: 230 },
  { destination: "Hungary", minutes: 215 },
  { destination: "Hungary - Cellular", minutes: 130 },
  { destination: "Iceland", minutes: 860 },
  { destination: "Iceland - Cellular", minutes: 730 },
  { destination: "India", minutes: 330 },
  { destination: "India - Cellular", minutes: 325 },
  { destination: "Indonesia", minutes: 170 },
  { destination: "Indonesia - Cellular", minutes: 150 },
  { destination: "Indonesia - Jakarta", minutes: 185 },
  { destination: "Indonesia - Surabaya", minutes: 195 },
  { destination: "Inmarsat", minutes: 5 },
  { destination: "International Networks", minutes: 5 },
  { destination: "Interstate", minutes: 1000 },
  { destination: "Intrastate", minutes: 1000 },
  { destination: "Iran", minutes: 40 },
  { destination: "Iran - Cellular", minutes: 35 },
  { destination: "Iran - Tehran", minutes: 40 },
  { destination: "Iraq", minutes: 35 },
  { destination: "Iraq - Baghdad", minutes: 55 },
  { destination: "Iraq - Cellular", minutes: 30 },
  { destination: "Ireland", minutes: 645 },
  { destination: "Ireland - Cellular", minutes: 570 },
  { destination: "Israel", minutes: 285 },
  { destination: "Israel - Cellular", minutes: 90 },
  { destination: "Israel - Palestine Authority", minutes: 35 },
  { destination: "Israel - Palestine Authority - Cellular", minutes: 25 },
  { destination: "Italy", minutes: 1000 },
  { destination: "Italy - Cellular", minutes: 350 },
  { destination: "Ivory Coast", minutes: 20 },
  { destination: "Ivory Coast - Cellular - Moov", minutes: 20 },
  { destination: "Ivory Coast - Cellular - MTN", minutes: 20 },
  { destination: "Ivory Coast - Cellular - Orange", minutes: 30 },
  { destination: "Ivory Coast - Cellular - Other", minutes: 25 },
  { destination: "Jamaica", minutes: 30 },
  { destination: "Jamaica - Cellular - C&W", minutes: 30 },
  { destination: "Jamaica - Cellular - Digicel", minutes: 30 },
  { destination: "Japan", minutes: 470 },
  { destination: "Japan - Cellular", minutes: 200 },
  { destination: "Jordan", minutes: 45 },
  { destination: "Jordan - Cellular", minutes: 40 },
  { destination: "Kazakhstan", minutes: 160 },
  { destination: "Kazakhstan - Cellular", minutes: 40 },
  { destination: "Kenya", minutes: 35 },
  { destination: "Kenya - Cellular - Celtel", minutes: 35 },
  { destination: "Kenya - Cellular - Orange", minutes: 35 },
  { destination: "Kenya - Cellular - Other", minutes: 30 },
  { destination: "Kenya - Cellular - Safaricom", minutes: 125 },
  { destination: "Kiribati", minutes: 5 },
  { destination: "Kosovo", minutes: 40 },
  { destination: "Kosovo - Cellular", minutes: 15 },
  { destination: "Kuwait", minutes: 160 },
  { destination: "Kuwait - Cellular", minutes: 175 },
  { destination: "Kyrgyzstan", minutes: 35 },
  { destination: "Kyrgyzstan - Cellular", minutes: 35 },
  { destination: "Laos", minutes: 85 },
  { destination: "Laos - Cellular", minutes: 85 },
  { destination: "Latvia", minutes: 35 },
  { destination: "Latvia - Cellular", minutes: 20 },
  { destination: "Latvia - Olo", minutes: 20 },
  { destination: "Lebanon", minutes: 80 },
  { destination: "Lebanon - Cellular", minutes: 40 },
  { destination: "Lesotho", minutes: 10 },
  { destination: "Lesotho - Cellular", minutes: 15 },
  { destination: "Liberia", minutes: 15 },
  { destination: "Liberia - Cellular - Cellcom", minutes: 20 },
  { destination: "Liberia - Cellular - Comium", minutes: 20 },
  { destination: "Liberia - Cellular - Libercell", minutes: 15 },
  { destination: "Liberia - Cellular - Lonestar", minutes: 20 },
  { destination: "Libya", minutes: 30 },
  { destination: "Libya - Cellular", minutes: 25 },
  { destination: "Libya - Cellular - Al Hurra", minutes: 30 },
  { destination: "Liechtenstein", minutes: 145 },
  { destination: "Liechtenstein - Cellular", minutes: 125 },
  { destination: "Liechtenstein - Premium Services", minutes: 80 },
  { destination: "Lithuania", minutes: 50 },
  { destination: "Lithuania - Cellular", minutes: 20 },
  { destination: "Lithuania - Personal Numbering", minutes: 10 },
  { destination: "Luxembourg", minutes: 40 },
  { destination: "Luxembourg - Cellular", minutes: 40 },
  { destination: "Macao", minutes: 60 },
  { destination: "Macao - Cellular", minutes: 40 },
  { destination: "Macedonia", minutes: 45 },
  { destination: "Macedonia - Cellular", minutes: 15 },
  { destination: "Madagascar", minutes: 10 },
  { destination: "Madagascar - Cellular", minutes: 10 },
  { destination: "Malawi", minutes: 15 },
  { destination: "Malawi - Cellular", minutes: 15 },
  { destination: "Malaysia", minutes: 685 },
  { destination: "Malaysia - Cellular", minutes: 885 },
  { destination: "Maldives", minutes: 10 },
  { destination: "Mali", minutes: 15 },
  { destination: "Mali - Cellular", minutes: 15 },
  { destination: "Malta", minutes: 60 },
  { destination: "Malta - Cellular", minutes: 15 },
  { destination: "Mariana Islands", minutes: 180 },
  { destination: "Mariana Islands - Cellular", minutes: 1000 },
  { destination: "Marshall Islands", minutes: 30 },
  { destination: "Marshall Islands - Cellular", minutes: 30 },
  { destination: "Martinique", minutes: 570 },
  { destination: "Martinique - Cellular", minutes: 80 },
  { destination: "Mauritania", minutes: 15 },
  { destination: "Mauritania - Cellular", minutes: 10 },
  { destination: "Mauritius", minutes: 115 },
  { destination: "Mexico - Cellular - ATT", minutes: 1500 },
  { destination: "Mexico - Cellular - Iusacell", minutes: 1500 },
  { destination: "Mexico - Cellular - Movistar", minutes: 1500 },
  { destination: "Mexico - Cellular - Offnet - Telcel", minutes: 1500 },
  { destination: "Mexico - Cellular - Onnet - Telcel", minutes: 1500 },
  { destination: "Mexico - Cellular - Telcel", minutes: 1500 },
  { destination: "Mexico - Offnet", minutes: 1500 },
  { destination: "Mexico - Onnet", minutes: 1500 },
  { destination: "Mexico - ROC", minutes: 1500 },
  { destination: "Mexico - Satellite", minutes: 1500 },
  { destination: "Mexico - Triangle", minutes: 1500 },
  { destination: "Micronesia", minutes: 10 },
  { destination: "Micronesia - Cellular", minutes: 10 },
  { destination: "Moldova", minutes: 25 },
  { destination: "Moldova - Cellular", minutes: 30 },
  { destination: "Monaco", minutes: 105 },
  { destination: "Monaco - Cellular", minutes: 15 },
  { destination: "Mongolia", minutes: 365 },
  { destination: "Mongolia - Cellular", minutes: 490 },
  { destination: "Montenegro", minutes: 30 },
  { destination: "Montenegro - Cellular", minutes: 15 },
  { destination: "Montserrat", minutes: 30 },
  { destination: "Montserrat - Cellular", minutes: 30 },
  { destination: "Morocco", minutes: 75 },
  { destination: "Morocco - Cellular", minutes: 10 },
  { destination: "Morocco - Wana", minutes: 25 },
  { destination: "Mozambique", minutes: 25 },
  { destination: "Mozambique - Cellular", minutes: 25 },
  { destination: "Myanmar", minutes: 40 },
  { destination: "Myanmar - Cellular", minutes: 40 },
  { destination: "Namibia", minutes: 65 },
  { destination: "Namibia - Cellular", minutes: 250 },
  { destination: "Nauru", minutes: 5 },
  { destination: "Nepal", minutes: 45 },
  { destination: "Nepal - Cellular", minutes: 40 },
  { destination: "Nepal - Kathmandu", minutes: 45 },
  { destination: "Netherlands", minutes: 120 },
  { destination: "Netherlands - Cellular", minutes: 30 },
  { destination: "Netherlands Antilles", minutes: 45 },
  { destination: "Netherlands Antilles - Cellular", minutes: 50 },
  { destination: "Netherlands Antilles - Curacao", minutes: 100 },
  { destination: "New Caledonia", minutes: 25 },
  { destination: "New Zealand", minutes: 575 },
  { destination: "New Zealand - Cellular", minutes: 190 },
  { destination: "New Zealand - Scott Base", minutes: 185 },
  { destination: "Nicaragua", minutes: 30 },
  { destination: "Nicaragua - Cellular - Claro", minutes: 55 },
  { destination: "Nicaragua - Cellular - Movistar", minutes: 35 },
  { destination: "Niger", minutes: 20 },
  { destination: "Niger - Cellular", minutes: 20 },
  { destination: "Nigeria", minutes: 50 },
  { destination: "Nigeria - Cellular - Celtel", minutes: 70 },
  { destination: "Nigeria - Cellular - Globacom", minutes: 90 },
  { destination: "Nigeria - Cellular - MTN", minutes: 95 },
  { destination: "Nigeria - Cellular - Other", minutes: 80 },
  { destination: "Nigeria - Lagos", minutes: 50 },
  { destination: "Niue", minutes: 5 },
  { destination: "Norfolk Island", minutes: 5 },
  { destination: "North Korea", minutes: 15 },
  { destination: "Norway", minutes: 1000 },
  { destination: "Norway - Cellular", minutes: 885 },
  { destination: "Oman", minutes: 65 },
  { destination: "Oman - Cellular", minutes: 50 },
  { destination: "Pakistan", minutes: 150 },
  { destination: "Pakistan - Cellular - Other", minutes: 210 },
  { destination: "Pakistan - Cellular - Telenor", minutes: 110 },
  { destination: "Pakistan - Cellular - Warid", minutes: 175 },
  { destination: "Palau", minutes: 15 },
  { destination: "Palestine", minutes: 40 },
  { destination: "Palestine - Cellular", minutes: 25 },
  { destination: "Panama", minutes: 240 },
  { destination: "Panama - Cellular", minutes: 55 },
  { destination: "Papua New Guinea", minutes: 10 },
  { destination: "Paraguay", minutes: 345 },
  { destination: "Paraguay - Asuncion", minutes: 325 },
  { destination: "Paraguay - Cellular", minutes: 200 },
  { destination: "Peru", minutes: 1280 },
  { destination: "Peru - Cellular - America Movil", minutes: 1000 },
  { destination: "Peru - Cellular - Nextel", minutes: 1000 },
  { destination: "Peru - Cellular - Other", minutes: 1000 },
  { destination: "Peru - Cellular - Telefonica", minutes: 1000 },
  { destination: "Peru - Lima", minutes: 1000 },
  { destination: "Peru - Rural", minutes: 1000 },
  { destination: "Philippines", minutes: 50 },
  { destination: "Philippines - Cellular - Globe", minutes: 90 },
  { destination: "Philippines - Cellular - Other", minutes: 45 },
  { destination: "Philippines - Cellular - Smart", minutes: 85 },
  { destination: "Philippines - Manila", minutes: 55 },
  { destination: "Poland", minutes: 785 },
  { destination: "Poland - Cellular", minutes: 120 },
  { destination: "Portugal", minutes: 400 },
  { destination: "Portugal - Cellular", minutes: 60 },
  { destination: "Puerto Rico", minutes: 1000 },
  { destination: "Puerto Rico - Cellular", minutes: 1000 },
  { destination: "Qatar", minutes: 40 },
  { destination: "Qatar - Cellular", minutes: 40 },
  { destination: "Reunion Island", minutes: 40 },
  { destination: "Reunion Island - Cellular", minutes: 20 },
  { destination: "Romania", minutes: 1000 },
  { destination: "Romania - Cellular", minutes: 930 },
  { destination: "Russia", minutes: 220 },
  { destination: "Russia - Abkhazia", minutes: 30 },
  { destination: "Russia - Cellular - Beeline", minutes: 40 },
  { destination: "Russia - Cellular - Megafone", minutes: 40 },
  { destination: "Russia - Cellular - MTS", minutes: 40 },
  { destination: "Russia - Cellular - Other", minutes: 25 },
  { destination: "Russia - Moscow", minutes: 65 },
  { destination: "Russia - St. Petersburg", minutes: 420 },
  { destination: "Rwanda", minutes: 25 },
  { destination: "Rwanda - Cellular", minutes: 30 },
  { destination: "Samoa", minutes: 10 },
  { destination: "Samoa - Cellular", minutes: 5 },
  { destination: "San Marino", minutes: 5 },
  { destination: "San Marino - Cellular", minutes: 5 },
  { destination: "Sao Tome and Principe", minutes: 5 },
  { destination: "Saudi Arabia", minutes: 50 },
  { destination: "Saudi Arabia - Cellular - Other", minutes: 55 },
  { destination: "Saudi Arabia - Cellular - STC", minutes: 15 },
  { destination: "Senegal", minutes: 30 },
  { destination: "Senegal - Cellular - Orange", minutes: 50 },
  { destination: "Senegal - Cellular - Sudatel", minutes: 15 },
  { destination: "Senegal - Cellular - Tigo", minutes: 15 },
  { destination: "Serbia", minutes: 45 },
  { destination: "Serbia - Cellular", minutes: 15 },
  { destination: "Serbia - Kosovo", minutes: 45 },
  { destination: "Serbia - Olo", minutes: 45 },
  { destination: "Seychelles", minutes: 10 },
  { destination: "Sierra Leone", minutes: 20 },
  { destination: "Sierra Leone - Cellular", minutes: 15 },
  { destination: "Singapore", minutes: 425 },
  { destination: "Singapore - Cellular", minutes: 525 },
  { destination: "Slovakia", minutes: 1000 },
  { destination: "Slovakia - Cellular", minutes: 55 },
  { destination: "Slovenia", minutes: 40 },
  { destination: "Slovenia - Cellular", minutes: 15 },
  { destination: "Solomon Islands", minutes: 5 },
  { destination: "Somalia", minutes: 15 },
  { destination: "Somalia - Cellular", minutes: 25 },
  { destination: "South Africa", minutes: 95 },
  { destination: "South Africa - Cellular", minutes: 90 },
  { destination: "South Africa - Cellular - MTN", minutes: 45 },
  { destination: "South Korea", minutes: 570 },
  { destination: "South Korea - Cellular", minutes: 605 },
  { destination: "South Sudan", minutes: 15 },
  { destination: "South Sudan - Cellular", minutes: 15 },
  { destination: "Spain", minutes: 1000 },
  { destination: "Spain - Cellular", minutes: 455 },
  { destination: "Spain - Cellular - Special", minutes: 35 },
  { destination: "Sri Lanka", minutes: 40 },
  { destination: "Sri Lanka - Cellular", minutes: 45 },
  { destination: "St. Helena", minutes: 5 },
  { destination: "St. Kitts and Nevis", minutes: 35 },
  { destination: "St. Kitts and Nevis - Cellular", minutes: 30 },
  { destination: "St. Lucia", minutes: 40 },
  { destination: "St. Lucia - Cellular", minutes: 35 },
  { destination: "St. Maarten", minutes: 60 },
  { destination: "St. Maarten - Cellular", minutes: 55 },
  { destination: "St. Pierre and Miquelon", minutes: 15 },
  { destination: "St. Pierre and Miquelon - Cellular", minutes: 15 },
  { destination: "St. Vincent", minutes: 35 },
  { destination: "St. Vincent - Cellular", minutes: 30 },
  { destination: "Sudan", minutes: 50 },
  { destination: "Sudan - Cellular - MTN", minutes: 25 },
  { destination: "Sudan - Cellular - Sudatel", minutes: 20 },
  { destination: "Sudan - Cellular - Zain", minutes: 35 },
  { destination: "Suriname", minutes: 25 },
  { destination: "Suriname - Cellular", minutes: 25 },
  { destination: "Swaziland", minutes: 55 },
  { destination: "Swaziland - Cellular", minutes: 50 },
  { destination: "Sweden", minutes: 1000 },
  { destination: "Sweden - Cellular", minutes: 165 },
  { destination: "Switzerland", minutes: 454 },
  { destination: "Switzerland - Cellular", minutes: 25 },
  { destination: "Switzerland - Cellular - Sunrise", minutes: 25 },
  { destination: "Syria", minutes: 30 },
  { destination: "Syria - Cellular", minutes: 25 },
  { destination: "Taiwan", minutes: 300 },
  { destination: "Taiwan - Cellular", minutes: 70 },
  { destination: "Tajikistan", minutes: 40 },
  { destination: "Tajikistan - Cellular", minutes: 35 },
  { destination: "Tanzania", minutes: 30 },
  { destination: "Tanzania - Cellular", minutes: 30 },
  { destination: "Thailand", minutes: 265 },
  { destination: "Thailand - Bangkok", minutes: 210 },
  { destination: "Thailand - Cellular", minutes: 270 },
  { destination: "Togo", minutes: 25 },
  { destination: "Togo - Cellular", minutes: 40 },
  { destination: "Tokelau", minutes: 5 },
  { destination: "Toll Free", minutes: 1000 },
  { destination: "Tonga", minutes: 10 },
  { destination: "Tonga - Cellular", minutes: 5 },
  { destination: "Trinidad and Tobago", minutes: 180 },
  { destination: "Trinidad and Tobago - Cellular", minutes: 50 },
  { destination: "Tunisia", minutes: 10 },
  { destination: "Tunisia - Cellular", minutes: 10 },
  { destination: "Vietnam - Ho Chi Minh", minutes: 110 },
  { destination: "Wallis and Futuna", minutes: 5 },
  { destination: "Yemen", minutes: 45 },
  { destination: "Yemen - Cellular - MTN", minutes: 50 },
  { destination: "Yemen - Cellular - Other", minutes: 50 },
  { destination: "Zambia", minutes: 15 },
  { destination: "Zambia - Cellular", minutes: 15 },
  { destination: "Zimbabwe", minutes: 25 },
  { destination: "Zimbabwe - Cellular", minutes: 10 }
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
      {/* <TopHeader /> */}
      <Header />
      <HeadBar text="ZOIKO MOBILE INTERNATIONAL CALLING BUNDLES" />

      <Container className="py-5">

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

        <Row className="text-center bgred txtwhite py-2 mb-2">
            <Col md={6}>Destination</Col>
            <Col md={6}>Minutes on $15 per month</Col>
        </Row>

        {currentData.length > 0 ? (
                currentData.map((row, index) => (
                    <Row key={index} className="text-center">
                    <Col md={6} className="py-2" style={{ backgroundColor: "#dee0e0ff" }}>{row.destination}</Col>
                    <Col md={6} className="py-2" style={{ backgroundColor: "#dee0e0ff" }}>{row.minutes}</Col>
                    </Row>
                ))
            ) : (
                <p>No results found.</p>
        )}

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