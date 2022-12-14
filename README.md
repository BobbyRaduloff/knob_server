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
* [Committee]

BulgarianStandard/EuropeanStandard <- Standard:
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

