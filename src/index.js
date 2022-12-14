#!/user/bin/env node
import "core-js/stable";
import "regenerator-runtime/runtime";

import BulgarianStandard from "#models/BulgarianStandard";
import Certificate from "#models/Certificate";
import CommitteeMember from "#models/CommitteeMember";
import Company from "#models/Company";
import CourseItem from "#models/CourseItem";
import EthicsCommittee from "#models/EthicsCommittee";
import EthicsProtocol from "#models/EthicsProtocol";
import EuropeanStandard from "#models/EuropeanStandard";
import File from "#models/File";
import InternationalContent from "#models/InternationalContent";
import KNOBContent from "#models/KNOBContent";
import KSCommittee from "#models/KSCommittee";
import LiteratureContent from "#models/LiteratureContent";
import MethodologyCommittee from "#models/MethodologyCommittee";
import OSProtocol from "#models/OSProtocol";
import PublicationContent from "#models/PublicationContent";
import QualificationItem from "#models/QualificationItem";
import RegionalCommittee from "#models/RegionalCommittee";
import REV from "#models/REV";
import SeminarItem from "#models/SeminarItem";
import USCommittee from "#models/USCommittee";
import User from "#models/User";
import USProtocol from "#models/USProtocol";

const models = [
  BulgarianStandard,
  Certificate,
  CommitteeMember,
  Company,
  CourseItem,
  EthicsCommittee,
  EthicsProtocol,
  EuropeanStandard,
  File,
  InternationalContent,
  KNOBContent,
  KSCommittee,
  LiteratureContent,
  MethodologyCommittee,
  OSProtocol,
  PublicationContent,
  QualificationItem,
  RegionalCommittee,
  REV,
  SeminarItem,
  USCommittee,
  User,
  USProtocol,
];

models.forEach((m) => m);
