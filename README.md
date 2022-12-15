# knob_server

## Data Structures
File:
* Name
* Path (store as uuid)
* Timestamp
* MimeType

KNOBContent/LiteratureContent/PublicationContent/InternationalContent <- Content:
* Title
* Timestamp
* Picture - optional
* File - optional
* Short Description - optional
* Description (HTML) - optional

SeminarItem / CourseItem / QualificationItem <- Item:
* Title
* Timestamp
* Picture - optional
* [File, File, File] - all optional
* Description (HTML) - optional

CommitteeMember:
* Full Name
* Email
* IsRepresentative

MethodologyCommittee/USCommittee/KSCommittee/EthicsCommittee <- Committee:
* [CommitteeMember]

RegionalCommittee:
* CityName
* [CommitteeMember]

BulgarianStandard/EuropeanStandard <- Standard:
* Title
* [File], len(5), optional
* Timestamp (last changed)

USProtocol/KSProtocol/EthicsProtcol/OSProtocol <- Protocol:
* Title
* Photo - optional
* Timestamp
* [File], optional
* Description - optional

REV:
* CertificateNumber
* IssuedOn
* ValidUntil
* LatinName
* CyrilicName
* LatinCity
* CyrilicCity

Certificate:
* Number, id 0 onwards (auto)
* Owner, User / Company
* Type: Enum(Person, Company)
* CertificateNumber
* IsValid
* ReasonForInvalidation, optional
* CertificateType, Enum("Недвижими имоти", "Недвижими културни ценности", "Машини и съоражения", "Права на интелектуална и индустриална собственост, "Търговски предприяти и вземания", "Финансови активи", "Финансови институции", "Други активи", "Земеделски земи и трайни насъждения", "Поземлени имоти в горски територии"), convert to acronym
* NewCertificate, optional

User:
* Number, id 0 onwards
* UserType, Enum(Admin, Curator, User, Guest)
* FirstName 
* MiddleName
* LastName
* [Capacity], Enum("Недвижими имоти", "Недвижими културни ценности", "Машини и съоражения", "Права на интелектуална и индустриална собственост, "Търговски предприяти и вземания", "Финансови активи", "Финансови институции", "Други активи", "Земеделски земи и трайни насъждения", "Поземлени имоти в горски територии"), (optional, null if Guest)
* IsKNOBMember
* [InvalidCertificates], optional
* CurrentValidCertificate, optional
* Address optional
* MobilePhone (optional)
* Landline (optional)
* Specialty (null if guest)
* Experience optional
* Education optional
* City

Company:
* Number, id 0 onwards
* Name
* City
* MobilePhone (optional)
* Landline (optional)
* [Capacity], Enum("Недвижими имоти", "Недвижими културни ценности", "Машини и съоражения", "Права на интелектуална и индустриална собственост, "Търговски предприяти и вземания", "Финансови активи", "Финансови институции", "Други активи", "Земеделски земи и трайни насъждения", "Поземлени имоти в горски територии")
* [InvalidCertificates], optional
* CurrentValidCertificate, optional
* EIK
* Address
* [Valuer], User, len >= 1

## Checks
If not logged in:
    * `/about-us`
    * `/blog-news`
    * `/blog-details/[id]`
    * `/seminars`
    * `/courses`
    * `/qualifications`
    * `/qualification-committee`
    * `/board-of-directors`
    * `/control-board`
    * `/ethics`
    * `/[city_latin]`
    * `/valuation-standards`
    * `/valuation-standards-eu`
    * `/literature`
    * `/publications`
    * `/rev`
    * `/contact`
    * `/login`
    * `/public-registry`
    * `/rev-registry`
    * `/documents`
IsUserLoggedIn (if logged in and if has valid certificate`):
    * `/us`
    * `/ks`
    * `/kpe`
    * `/os`
IsUserCurator:
    * `/dashboard-admin`
    * `/dashboard-international`
    * `/dashboard-seminars`
    * `/dashboard-courses`
    * `/dashboard-qualifications`
    * `/members-methodology`
    * `/members-us`
    * `/members-ks`
    * `/members-kpe`
    * `/members-rc`
    * `/dashboard-standards`
    * `/dashboard-literature`
    * `/dashboard-publications`
    * `/dashboard-us`
    * `/dashboard-ks`
    * `/dashboard-kpe`
    * `/dashboard-os`
    * `/dashboard-rev`
IsUserAdmin:
    * `/dashboard-registry`
    * `/dashboard-companies`

## API Endpoint
NB: Send multi-part-form not json, receive JSON
* `/api/create-admin-account`: IS_DEV POST JSON(User) -> Session Token
* `/api/create-curator-account`: IS_DEV POST JSON(User) -> Session Token
* `/api/login`: POST(email, password) -> Session Token
* `/api/logout`: GET() -> Delete Session Token 
* `/api/is-user-logged-in`: GET() -> result
* `/api/is-user-curator`: GET() -> result
* `/api/is-user-admin`: GET() -> result
* `/api/get-users`: (full_name opt, capacity enum opt, number opt, city opt) -> [User]
* `/api/get-companies`: () -> [Company]
* `/api/get-invalid-certificates`: (OwnerType) -> [Certificate, is_valid == false]
* `/api/get-rev-registry`: (name opt, city opt, certificate_number opt) -> [REV]
* `/api/get-knob-content`: () -> [KNOBContent]
* `/api/get-knob-content-item`: (_id) -> KNOBContent
* `/api/get-literature-content`: () -> [LiteratureContent]
* `/api/get-literature-content-item`: (_id) -> LiteratureContent
* `/api/get-publication-content`: () -> [PublicationContent]
* `/api/get-publication-content-item`: (_id) -> PublicationContent
* `/api/get-international-content`: () -> [InternationalContent]
* `/api/get-international-content-item`: (_id) -> InternationalContent
* `/api/get-us-committee`: () -> USCommittee
* `/api/get-ks-committee`: () -> KSCommittee
* `/api/get-ethics-committee`: () -> EthicsCommittee
* `/api/get-methodology-committee`: () -> MethodologyCommittee
* `/api/get-bulgarian-standards`: () -> [BulgarianStandard]
* `/api/get-european-standards`: () -> [EuropeanStandard]
* `/api/get-seminars`: () -> [SeminarItem]
* `/api/get-courses`: () -> [CourseItem]
* `/api/get-qualifications`: () -> [QualificationItem]
* `/api/get-regional-committee`: (city_name) -> RegionalCommittee
* `/api/get-us-protocols`: IsUserLoggedIn () -> [USProtocol]
* `/api/get-ks-protocols`: IsUserLoggedIn () -> [KSProtocol]
* `/api/get-ethics-protocols`: IsUserLoggedIn () -> [EthicsProtocol]
* `/api/get-os-protocols`: IsUserLoggedIn () -> [OSProtocol]
* `/api/post-knob-content`: IsUserCurator (KNOBContent) -> ()
* `/api/post-literature-content`: IsUserCurator (LiteratureContent) -> ()
* `/api/post-publication-content`: IsUserCurator (PublicationContent) -> ()
* `/api/post-international-content`: IsUserCurator (InternationalContent) -> ()
* `/api/post-seminar-item`: IsUserCurator (SeminarItem) -> ()
* `/api/post-course-item`: IsUserCurator (CourseItem) -> ()
* `/api/post-qualification-item`: IsUserCurator (QualificationItem) -> ()
* `/api/post-methodology-committee-member`: IsUserCurator (CommitteeMember) -> ()
* `/api/post-us-committee-member`: IsUserCurator (CommitteeMember) -> ()
* `/api/post-ks-committee-member`: IsUserCurator (CommitteeMember) -> ()
* `/api/post-ethics-committee-member`: IsUserCurator (CommitteeMember) -> ()
* `/api/post-regional-committee-member`: IsUserCurator (city_cyrillic, CommitteeMember)
* `/api/post-bulgarian-standard`: IsUserCurator (Standard) -> ()
* `/api/post-european-standard`: IsUserCurator (Standard) -> ()
* `/api/post-us-protocol`: IsUserCurator (Protocol) -> ()
* `/api/post-ks-protocol`: IsUserCurator (Protocol) -> ()
* `/api/post-ethics-protocol`: IsUserCurator (Protocol) -> ()
* `/api/post-os-protocol`: IsUserCurator (Protocol) -> ()
* `/api/post-rev`: IsUserCurator (REV) -> ()
* `/api/post-user`: IsUserAdmin (User) -> ()
* `/api/post-company`: IsUserCompany (Company) -> ()
* `/api/put-knob-content`: IsUserCurator (KNOBContent) -> ()
* `/api/put-literature-content`: IsUserCurator (LiteratureContent) -> ()
* `/api/put-publication-content`: IsUserCurator (PublicationContent) -> ()
* `/api/put-international-content`: IsUserCurator (InternationalContent) -> ()
* `/api/put-seminar-item`: IsUserCurator (SeminarItem) -> ()
* `/api/put-course-item`: IsUserCurator (CourseItem) -> ()
* `/api/put-qualification-item`: IsUserCurator (QualificationItem) -> ()
* `/api/put-methodology-committee-member`: IsUserCurator (CommitteeMember) -> ()
* `/api/put-us-committee-member`: IsUserCurator (CommitteeMember) -> ()
* `/api/put-ks-committee-member`: IsUserCurator (CommitteeMember) -> ()
* `/api/put-ethics-committee-member`: IsUserCurator (CommitteeMember) -> ()
* `/api/put-regional-committee-member`: IsUserCurator (city_cyrillic, CommitteeMember)
* `/api/put-bulgarian-standard`: IsUserCurator (Standard) -> ()
* `/api/put-european-standard`: IsUserCurator (Standard) -> ()
* `/api/put-us-protocol`: IsUserCurator (Protocol) -> ()
* `/api/put-ks-protocol`: IsUserCurator (Protocol) -> ()
* `/api/put-ethics-protocol`: IsUserCurator (Protocol) -> ()
* `/api/put-os-protocol`: IsUserCurator (Protocol) -> ()
* `/api/put-rev`: IsUserCurator (REV) -> ()
* `/api/put-user`: IsUserAdmin (User) -> ()
* `/api/put-company`: IsUserAdmin (Company) -> ()
* `/api/post-deactivate-certificate`: IsUserAdmin (User/Company ID, new optional, reasonforinvalidation) -> () create new if present, set new to previous if new
* `/api/delete-knob-content`: IsUserCurator (KNOBContent) -> ()
* `/api/delete-literature-content`: IsUserCurator (LiteratureContent) -> ()
* `/api/delete-publication-content`: IsUserCurator (PublicationContent) -> ()
* `/api/delete-international-content`: IsUserCurator (InternationalContent) -> ()
* `/api/delete-seminar-item`: IsUserCurator (SeminarItem) -> ()
* `/api/delete-course-item`: IsUserCurator (CourseItem) -> ()
* `/api/delete-qualification-item`: IsUserCurator (QualificationItem) -> ()
* `/api/delete-methodology-committee-member`: IsUserCurator (CommitteeMember) -> ()
* `/api/delete-us-committee-member`: IsUserCurator (CommitteeMember) -> ()
* `/api/delete-ks-committee-member`: IsUserCurator (CommitteeMember) -> ()
* `/api/delete-ethics-committee-member`: IsUserCurator (CommitteeMember) -> ()
* `/api/delete-regional-committee-member`: IsUserCurator (city_cyrillic, CommitteeMember)
* `/api/delete-bulgarian-standard`: IsUserCurator (Standard) -> ()
* `/api/delete-european-standard`: IsUserCurator (Standard) -> ()
* `/api/delete-us-protocol`: IsUserCurator (Protocol) -> ()
* `/api/delete-ks-protocol`: IsUserCurator (Protocol) -> ()
* `/api/delete-ethics-protocol`: IsUserCurator (Protocol) -> ()
* `/api/delete-os-protocol`: IsUserCurator (Protocol) -> ()
* `/api/delete-rev`: IsUserCurator (REV) -> ()