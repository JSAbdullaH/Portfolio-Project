# Portfolio Project - Project Charter Development (Stage 2)

## Introduction

For this Stage We establish a Project Charter that serves as the foundational document for our centralized IoT tracking and safety platform designed for site workers. 

The purpose of this document is to establish a shared understanding among all team members and stakeholders regarding the project's core objectives, scope boundaries, and execution strategy. It acts as the primary reference point to guide decision-making, manage risks, and ensure complete alignment throughout the 6-weeks MVP development lifecycle.

## Table of Contents
- [0. Define Project Objectives](#0-Define-Project-Objectives)
- [1. Identify Stakeholders and Team Roles](#1-Identify-Stakeholders-and-Team-Roles)
- [2. Define Scope](#2-Define-Scope)
- [3. Identify Risks](#3-Identify-Risks)
- [4. Develop a High-Level Plan](#4-Develop-a-High-Level-Plan)
- [5. Authors](#6-Authors)

---

## 0. Define Project Objectives

Our platform provides a smart tracking and safety solution designed for organizations to meticulously monitor the health, safety, and exact locations of their on-site workforce. By streamlining administrative operations and delivering actionable data analytics based on logged activities, the system enhances managerial decision-making and drastically reduces wasted operational costs, time, and effort.

To achieve this, we are developing a comprehensive system that logs employee site movements, clarifies their tasks, and records daily operations through seamless integration with health-sensor-equipped IOT provided to the workers. Organizations can oversee all these activities via a customized, centralized dashboard. This interface empowers site managers to manage employee profiles, monitor live updates, Managers can assign workloads and tasks and review the work log for each employee and receive instant automated alerts if a worker's vital signs reach critical thresholds or if they breach designated geofenced boundaries on a site-specific interactive map.

---

### Project Objectives

**Project Purpose:**
To equip organizations with a centralized, proactive tracking platform that integrates wearable IoT data with a live administrative dashboard, ensuring workforce safety while optimizing operational efficiency and reducing wasted resources. 

**Objectives:**
*   **Objective 1 Real-Time Tracking & Profiles:** Develop a customized administrative dashboard featuring live map integration and employee profile management, allowing managers to track site movements and task updates continuously by the end of Week 8.
*   **Objective 2 Automated Safety & Geofence Alerts:** Implement an automated alert system integrated with an IOT data to trigger instant warning messages when a worker's vital signs are negatively affected or when they exit a designated geofenced zone, fully functional by Week 9.
*   **Objective 3 Data Analytics & Operational Efficiency:** Build a robust data-logging architecture that records daily site operations and movements, generating high-level administrative insights designed to prove a reduction in operational waste by the final presentation in Week 12.

---


## 1. Identify Stakeholders and Team Roles

### Project Stakeholders
Stakeholders represent all individuals or groups who have an interest in the project, whether they are directly involved in building it or will be affected by its deployment.

**Internal Stakeholders:**
*   **Development Team:** The Business Developers and engineers building the MVP "Laila, Saad, Faisal, Abdullah".
**External Stakeholders:**
*   **Site Managers & Operators:** The primary users of the dashboard who rely on the platform to monitor workforce safety and make operational decisions.
*   **Frontline Workforce / Volunteers:** The end-users wearing the tracking devices.
*   **Partner Organizations "Potential":** Mega-project contractors or crowd management authorities seeking to adopt the MVP.

---

### Team Roles and Responsibilities
To ensure accountability and smooth execution during the 6-week MVP timeline, technical and administrative responsibilities have been strictly assigned.

| Team Member | Project Role | Core Responsibilities |
| :--- | :--- | :--- |
| **Laila** | PM, Frontend lead & Fullstack Developer | Oversees project timeline and documentation. Designs UI/UX, develops the interactive administrative dashboard, integrates the live map, and implements real-time UI alerts while also providing technical support in the Software engineering. |
| **Saad** | Backend lead & Fullstack Developer| Builds the RESTful API, develops the backend logic engine to process incoming IoT/simulated data, and sets up safety threshold rules while also providing technical support in the Software engineering . |
| **Faisal** | Database Administrator & Fullstack Developer  | Designs the database schema, manages data logging for employee profiles, coordinates historical data storage, and ensures efficient querying while also providing technical support in the Software engineering. |
| **Abdullah** | System Architect, DevOps & Fullstack Developer  | Maps the overall system architecture, manages cloud deployment, builds the data simulation scripts and hardware integration, and handles network routing while also providing technical support in the Software engineering. |
---


## 2. Define Scope

**Scope Statement:** 
The scope of this MVP is focused on developing the core software infrastructure—a fully functional web dashboard, a robust backend RESTful API, and a centralized database—capable of receiving, processing, and displaying structured tracking and health data to ensure workforce safety.

**In-Scope:**
*   **Web-Based Dashboard:** Development of an interactive frontend administrative interface for site managers.
*   **Live Map Integration:** Real-time plotting of worker GPS coordinates on a site-specific map.
*   **Backend & API:** A functional RESTful API logic that receives, process, and routes incoming telemetry data.
*   **Database Management:** Storing and retrieving employee profiles, historical movement logs, and alert records securely.
*   **Automated Alert Logic:** A logic engine that triggers UI notifications based on predefined safety thresholds.
*   **Data Integration:** Integration with a data source to feed structured GPS and health metrics into the system.

**Out-of-Scope:**
*   **Assets tracking & customizing other tracking solutions:**....
*   **Native Mobile Applications:** Developing standalone iOS or Android mobile apps for managers or workers.
*   **Enterprise System Integrations:** Integration with external third-party software such as HR, payroll, or ERP systems.
*   **Advanced AI Analytics:** Implementing machine learning or complex predictive AI models for worker behavior.
*   **Offline Mesh Networking:** Building complex local networks (like LoRaWAN) for areas with zero internet coverage (the MVP assumes data reaches the server via standard internet protocols).
---

## 3. Identify Risks


Anticipating potential challenges is critical for maintaining the 6-week MVP timeline. The following table identifies high-priority risks across technology, timelines, and team dynamics, along with proactive mitigation plans.

| Risk Category | Potential Risk | Mitigation Strategy |
| :--- | :--- | :--- |
| **Integration** | **Frontend-Backend Bottleneck:** Frontend development (Dashboard) stalls while waiting for the Backend API to be fully functional. | **Mitigation:** Define a strict API contract (JSON schema) in Week 1. Use Mock APIs (e.g., Postman) so the Frontend can be built and tested independently of the Backend progress. |
| **Performance** | **Live Map Overload:** Continuous real-time data streaming causes the web dashboard or map to freeze/crash during the demo. | **Mitigation:** Implement data throttling (e.g., fetching updates every 5-10 seconds instead of every second) and optimize UI re-rendering logic. |
| **Hardware** | **Hardware/Network Failure:** The physical IoT fails to connect or the internet drops during the final live presentation. | **Mitigation:** Develop a fully tested Python simulation script as a permanent backup. If hardware fails, the script will instantly inject simulated data into the API to keep the demo running seamlessly. |
| **Timeline & Scope** | **Scope Creep:** we attempts to add unplanned features like complex analytics, jeopardizing the 6-week MVP deadline. | **Mitigation:** Strictly adhere to the "In-Scope" items defined in this charter. Any new feature requests must be documented in a backlog for post-MVP phases. |
| **Team Dynamics** | **Knowledge Silos:** Only one person understands a critical component. | **Mitigation:** Conduct weekly sync meetings and daily Stand-ups to maintain clear, shared understanding for all system architectures and API endpoints. |

---

## 4. Develop a High-Level Plan

The project lifecycle spans 12 weeks and is divided into five major stages based on the updated timeline.

**Stage 1: Team Formation & Idea Dev**
*   **Timeline:** W1 (13 Sep - 19 Sep).
*   **Milestone:** Team formation and finalization of the project concept.
*   **Deliverable:** Selection of the "Frontline Workforce Tracking System" concept and initial feature brainstorming.

**Stage 2: Project Charter Development**
*   **Timeline:** W2 (20 Sep - 26 Sep).
*   **Milestone:** Defining project boundaries, roles, and risk management strategies.
*   **Deliverable:** Completion and approval of this Project Charter.

**Stage 3: Technical Documentation**
*   **Timeline:** W3 (27 Sep - 3 Oct) to W4 (4 Oct - 10 Oct).
*   **Milestone:** Establishing the technical blueprint before coding begins.
*   **Deliverables:** System Architecture diagram, UI/UX Wireframes for the dashboard, Database Schema design, and API route definitions.

**Stage 4: MVP Development & Execution**
*   **Timeline:** W5 (11 Oct - 17 Oct) to W10 (15 Nov - 21 Nov).
*   **Milestone:** Execution of the core technical scope (Frontend, Backend, Integration).
*   **Deliverables:** Functional administrative dashboard, integration of simulated IoT data (vital signs/GPS), and automated UI safety alerts.

**Stage 5: Project Closure**
*   **Timeline:** W11 (22 Nov - 28 Nov) to W12 (29 Nov - 5 Dec).
*   **Milestone:** System stabilization and presentation readiness.
*   **Deliverables:** End-to-end system testing, bug fixing, final code deployment, and successful live demonstration of the tracking platform.

---



## 5. Authors

* **Laila Alghamdi** | <br>
  [GitHub](https://github.com/laila-khalid)
* **Abdullah Alzara** | <br>
  [GitHub](https://github.com/JSAbdullaH)
* **Faisal Alshahrani** | <br>
  [GitHub](https://github.com/call-me-prof) 
* **Saad Alatar** |  <br>
  [GitHub](https://github.com/SaadTAr) 