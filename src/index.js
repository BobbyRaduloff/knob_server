#!/user/bin/env node

// Polyfill and config imports (must be first)
import "core-js/stable";
import "regenerator-runtime/runtime";
import * as dotenv from "dotenv";
dotenv.config();

// Outside Imports
import express from "express";
import multer from "multer";

// Our Imports
import create_admin_account from "#api/create-admin-account";
import create_curator_account from "#api/create-curator-account";
import delete_bulgarian_standard from "#api/delete-bulgarian-standard";
import delete_course_item from "#api/delete-course-item";
import delete_ethics_committee_member from "#api/delete-ethics-committee-member";
import delete_ethics_protocol from "#api/delete-ethics-protocol";
import delete_european_standard from "#api/delete-european-standard";
import delete_international_content from "#api/delete-international-content";
import delete_knob_content from "#api/delete-knob-content";
import delete_ks_committee_member from "#api/delete-ks-committee-member";
import delete_ks_protocol from "#api/delete-ks-protocol";
import delete_literature_content from "#api/delete-literature-content";
import delete_methodology_committee_member from "#api/delete-methodology-committee-member";
import delete_os_protocol from "#api/delete-os-protocol";
import delete_publication_content from "#api/delete-publication-content";
import delete_qualification_item from "#api/delete-qualification-item";
import delete_regional_committee_member from "#api/delete-regional-committee-member";
import delete_rev from "#api/delete-rev";
import delete_seminal_item from "#api/delete-seminal-item";
import delete_us_committee_member from "#api/delete-us-committee-member";
import delete_us_protocol from "#api/delete-us-protocol";
import get_bulgarian_standards from "#api/get-bulgarian-standards";
import get_companies from "#api/get-companies";
import get_courses from "#api/get-courses";
import get_ethics_committee from "#api/get-ethics-committee";
import get_ethics_protocols from "#api/get-ethics-protocols";
import get_european_standards from "#api/get-european-standards";
import get_international_content from "#api/get-international-content";
import get_international_content_item from "#api/get-international-content-item";
import get_invalid_certificates from "#api/get-invalid-certificates";
import get_knob_content from "#api/get-knob-content";
import get_knob_content_item from "#api/get-knob-content-item";
import get_ks_committee from "#api/get-ks-committee";
import get_ks_protocols from "#api/get-ks-protocols";
import get_literature_content from "#api/get-literature-content";
import get_literature_content_item from "#api/get-literature-content-item";
import get_methodology_committee from "#api/get-methodology-committee";
import get_os_protocols from "#api/get-os-protocols";
import get_publication_content from "#api/get-publication-content";
import get_publication_content_item from "#api/get-publication-content-item";
import get_qulifications from "#api/get-qulifications";
import get_regional_committee from "#api/get-regional-committee";
import get_rev_registry from "#api/get-rev-registry";
import get_seminars from "#api/get-seminars";
import get_us_committee from "#api/get-us-committee";
import get_us_protocols from "#api/get-us-protocols";
import get_users from "#api/get-users";
import is_user_admin from "#api/is-user-admin";
import is_user_curator from "#api/is-user-curator";
import is_user_logged_in from "#api/is-user-logged-in";
import login from "#api/login";
import logout from "#api/logout";
import post_bulgarian_standard from "#api/post-bulgarian-standard";
import post_company from "#api/post-company";
import post_course_item from "#api/post-course-item";
import post_deactivate_certificate from "#api/post-deactivate-certificate";
import post_ethics_committee_member from "#api/post-ethics-committee-member";
import post_ethics_protocol from "#api/post-ethics-protocol";
import post_european_standard from "#api/post-european-standard";
import post_international_content from "#api/post-international-content";
import post_knob_content from "#api/post-knob-content";
import post_ks_committee_member from "#api/post-ks-committee-member";
import post_ks_protocol from "#api/post-ks-protocol";
import post_literature_content from "#api/post-literature-content";
import post_methodology_committee_member from "#api/post-methodology-committee-member";
import post_os_protocol from "#api/post-os-protocol";
import post_publication_content from "#api/post-publication-content";
import post_qualification_item from "#api/post-qualification-item";
import post_regional_committee_member from "#api/post-regional-committee-member";
import post_rev from "#api/post-rev";
import post_seminar_item from "#api/post-seminar-item";
import post_us_committee_member from "#api/post-us-committee-member";
import post_us_protocol from "#api/post-us-protocol";
import post_user from "#api/post-user";
import put_bulgarian_standard from "#api/put-bulgarian-standard";
import put_company from "#api/put-company";
import put_course_item from "#api/put-course-item";
import put_ethics_committee_member from "#api/put-ethics-committee-member";
import put_ethics_protocol from "#api/put-ethics-protocol";
import put_european_standard from "#api/put-european-standard";
import put_international_content from "#api/put-international-content";
import put_knob_content from "#api/put-knob-content";
import put_ks_committee_member from "#api/put-ks-committee-member";
import put_ks_protocol from "#api/put-ks-protocol";
import put_literature_content from "#api/put-literature-content";
import put_methodology_committee_member from "#api/put-methodology-committee-member";
import put_os_protocol from "#api/put-os-protocol";
import put_qualification_item from "#api/put-qualification-item";
import put_regional_committee_member from "#api/put-regional-committee-member";
import put_rev from "#api/put-rev";
import put_seminar_item from "#api/put-seminar-item";
import put_us_committee_member from "#api/put-us-committee-member";
import put_us_protocol from "#api/put-us-protocol";
import put_user from "#api/put-user";

// Run Server
const app = express();

const del = [
  { url: "/api/delete-bulgarian-standard", f: delete_bulgarian_standard },
  { url: "/api/delete-course-item", f: delete_course_item },
  { url: "/api/delete-ethics-committee-member", f: delete_ethics_committee_member },
  { url: "/api/delete-ethics-protocol", f: delete_ethics_protocol },
  { url: "/api/delete-european-standard", f: delete_european_standard },
  { url: "/api/delete-international-content", f: delete_international_content },
  { url: "/api/delete-knob-content", f: delete_knob_content },
  { url: "/api/delete-ks-committee-member", f: delete_ks_committee_member },
  { url: "/api/delete-ks-protocol", f: delete_ks_protocol },
  { url: "/api/delete-literature-content", f: delete_literature_content },
  { url: "/api/delete-methodology-committee-member", f: delete_methodology_committee_member },
  { url: "/api/delete-os-protocol", f: delete_os_protocol },
  { url: "/api/delete-publication-content", f: delete_publication_content },
  { url: "/api/delete-qualification-item", f: delete_qualification_item },
  { url: "/api/delete-regional-committee-member", f: delete_regional_committee_member },
  { url: "/api/delete-rev", f: delete_rev },
  { url: "/api/delete-seminal-item", f: delete_seminal_item },
  { url: "/api/delete-us-committee-member", f: delete_us_committee_member },
  { url: "/api/delete-us-protocol", f: delete_us_protocol },
];
del.forEach((x) => app.delete(x.url, multer().none(), x.f));

const get = [
  { url: "/api/logout", f: logout },
  { url: "/api/get-bulgarian-standards", f: get_bulgarian_standards },
  { url: "/api/get-companies", f: get_companies },
  { url: "/api/get-courses", f: get_courses },
  { url: "/api/get-ethics-committee", f: get_ethics_committee },
  { url: "/api/get-ethics-protocols", f: get_ethics_protocols },
  { url: "/api/get-european-standards", f: get_european_standards },
  { url: "/api/get-international-content", f: get_international_content },
  { url: "/api/get-international-content-item", f: get_international_content_item },
  { url: "/api/get-invalid-certificates", f: get_invalid_certificates },
  { url: "/api/get-knob-content", f: get_knob_content },
  { url: "/api/get-knob-content-item", f: get_knob_content_item },
  { url: "/api/get-ks-committee", f: get_ks_committee },
  { url: "/api/get-ks-protocols", f: get_ks_protocols },
  { url: "/api/get-literature-content", f: get_literature_content },
  { url: "/api/get-literature-content-item", f: get_literature_content_item },
  { url: "/api/get-methodology-committee", f: get_methodology_committee },
  { url: "/api/get-os-protocols", f: get_os_protocols },
  { url: "/api/get-publication-content", f: get_publication_content },
  { url: "/api/get-publication-content-item", f: get_publication_content_item },
  { url: "/api/get-qulifications", f: get_qulifications },
  { url: "/api/get-regional-committee", f: get_regional_committee },
  { url: "/api/get-rev-registry", f: get_rev_registry },
  { url: "/api/get-seminars", f: get_seminars },
  { url: "/api/get-us-committee", f: get_us_committee },
  { url: "/api/get-us-protocols", f: get_us_protocols },
  { url: "/api/get-users", f: get_users },
  { url: "/api/is-user-logged-in", f: is_user_logged_in },
  { url: "/api/is-user-curator", f: is_user_curator },
  { url: "/api/is-user-admin", f: is_user_admin },
];
get.forEach((x) => app.get(x.url, multer().none(), x.f));

const post = [
  { url: "/api/create-admin-account", f: create_admin_account },
  { url: "/api/create-curator-account", f: create_curator_account },
  { url: "/api/login", f: login },
  { url: "/api/post-bulgarian-standard", f: post_bulgarian_standard },
  { url: "/api/post-company", f: post_company },
  { url: "/api/post-course-item", f: post_course_item },
  { url: "/api/post-deactivate-certificate", f: post_deactivate_certificate },
  { url: "/api/post-ethics-committee-member", f: post_ethics_committee_member },
  { url: "/api/post-ethics-protocol", f: post_ethics_protocol },
  { url: "/api/post-european-standard", f: post_european_standard },
  { url: "/api/post-international-content", f: post_international_content },
  { url: "/api/post-knob-content", f: post_knob_content },
  { url: "/api/post-ks-committee-member", f: post_ks_committee_member },
  { url: "/api/post-ks-protocol", f: post_ks_protocol },
  { url: "/api/post-literature-content", f: post_literature_content },
  { url: "/api/post-methodology-committee-member", f: post_methodology_committee_member },
  { url: "/api/post-os-protocol", f: post_os_protocol },
  { url: "/api/post-publication-content", f: post_publication_content },
  { url: "/api/post-qualification-item", f: post_qualification_item },
  { url: "/api/post-regional-committee-member", f: post_regional_committee_member },
  { url: "/api/post-rev", f: post_rev },
  { url: "/api/post-seminar-item", f: post_seminar_item },
  { url: "/api/post-us-committee-member", f: post_us_committee_member },
  { url: "/api/post-us-protocol", f: post_us_protocol },
  { url: "/api/post-user", f: post_user },
];
post.forEach((x) => app.post(x.url, multer().none(), x.f));

const put = [
  { url: "/api/put-bulgarian-standard", f: put_bulgarian_standard },
  { url: "/api/put-company", f: put_company },
  { url: "/api/put-course-item", f: put_course_item },
  { url: "/api/put-ethics-committee-member", f: put_ethics_committee_member },
  { url: "/api/put-ethics-protocol", f: put_ethics_protocol },
  { url: "/api/put-european-standard", f: put_european_standard },
  { url: "/api/put-international-content", f: put_international_content },
  { url: "/api/put-knob-content", f: put_knob_content },
  { url: "/api/put-ks-committee-member", f: put_ks_committee_member },
  { url: "/api/put-ks-protocol", f: put_ks_protocol },
  { url: "/api/put-literature-content", f: put_literature_content },
  { url: "/api/put-methodology-committee-member", f: put_methodology_committee_member },
  { url: "/api/put-os-protocol", f: put_os_protocol },
  { url: "/api/put-qualification-item", f: put_qualification_item },
  { url: "/api/put-regional-committee-member", f: put_regional_committee_member },
  { url: "/api/put-rev", f: put_rev },
  { url: "/api/put-seminar-item", f: put_seminar_item },
  { url: "/api/put-us-committee-member", f: put_us_committee_member },
  { url: "/api/put-us-protocol", f: put_us_protocol },
  { url: "/api/put-user", f: put_user },
];
put.forEach((x) => app.put(x.url, multer().none(), x.f));

console.log(`Server running on port ${process.env.PORT}...`);
app.listen(process.env.PORT);
