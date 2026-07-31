using System;
using System.Collections.Generic;

namespace SCIP.Api.Services
{
    public record DocumentDto(Guid Id, string Title, string Category, string FileType, string UploadedBy, DateTime UploadedAt);

    public interface IKnowledgeService
    {
        IEnumerable<DocumentDto> GetAllDocuments();
        DocumentDto AddDocument(string title, string category, string fileType, string uploadedBy);
    }

    public class KnowledgeService : IKnowledgeService
    {
        private static readonly List<DocumentDto> DocStore = new()
        {
            new DocumentDto(Guid.NewGuid(), "NIST SP 800-61 Rev 2 Incident Handling Guide", "Frameworks", "PDF", "SOC Lead", DateTime.UtcNow.AddDays(-3)),
            new DocumentDto(Guid.NewGuid(), "MITRE ATT&CK Enterprise Matrix v14", "Threat Intel", "PDF", "Security Analyst", DateTime.UtcNow.AddDays(-2)),
            new DocumentDto(Guid.NewGuid(), "Internal Incident Response Escalation SOP", "SOP", "DOCX", "Compliance Admin", DateTime.UtcNow.AddDays(-1))
        };

        public IEnumerable<DocumentDto> GetAllDocuments() => DocStore;

        public DocumentDto AddDocument(string title, string category, string fileType, string uploadedBy)
        {
            var doc = new DocumentDto(Guid.NewGuid(), title, category, fileType, uploadedBy, DateTime.UtcNow);
            DocStore.Insert(0, doc);
            return doc;
        }
    }
}
