using Business_Logic_Layer.DBO.Mediafiles;
using Business_Logic_Layer.Services.Interfaces;
using Business_Logic_Layer.Utilities;
using Data_Access_Layer.Entities;
using Data_Access_Layer.RepositoryWithUOW;
using Microsoft.EntityFrameworkCore;

namespace Business_Logic_Layer.Services
{
    public class MediaFileServices : IMediaFileServices
    {
        private readonly IUnitOfWork _UnitOfWork;
        public MediaFileServices(IUnitOfWork UnitOfWork)
        {
            _UnitOfWork = UnitOfWork;
        }

        public void DeleteMediaFile(int id)
        {
            var mediaFileToDelete = _UnitOfWork.MediaFile.GetById(id);
            _UnitOfWork.MediaFile.Delete(mediaFileToDelete);
            _UnitOfWork.Complete();
        }

        public MediafileViewModel GetMediaFileById(int id)
        {
            var mediaFileEntity = _UnitOfWork.MediaFile.GetById(id);
            MediafileViewModel mediaFileModel = AutoMappers<MediaFile, MediafileViewModel>.Map(mediaFileEntity);
            return mediaFileModel;
        }
        
        public IEnumerable<MediafileViewModel> GetMediaFiles()
        {
            var mediaFiles = _UnitOfWork.MediaFile.GetAll();
            IEnumerable<MediafileViewModel> mediaFileModel =
                AutoMappers<MediaFile, MediafileViewModel>.MapIQueryable(mediaFiles);
            return mediaFileModel;
        }

        public void UpdateProfilePhoto(MediafileViewModel mediaFileModel, int id)
        {
            MediaFile mediaFileEntity = AutoMappers<MediafileViewModel, MediaFile>.Map(mediaFileModel);
            mediaFileEntity.IsProfilePhoto = true;
            var employee = _UnitOfWork.Employee.GetById(id);
            var profilePhoto = employee.MediaFiles.FirstOrDefault(p => p.IsProfilePhoto == true);
            employee.MediaFiles.Remove(profilePhoto);
            employee.MediaFiles.Add(mediaFileEntity);
            _UnitOfWork.Employee.Update(employee);
            _UnitOfWork.Complete();
        }

        public void AddProfilePhoto(MediafileViewModel mediaFile, int id)
        {
            MediaFile mediafileEntity = AutoMappers<MediafileViewModel, MediaFile>.Map(mediaFile);
            mediafileEntity.IsProfilePhoto = true;
            Employee employee = _UnitOfWork.Employee.GetById(id);
            employee.MediaFiles.Add(mediafileEntity);
            _UnitOfWork.Employee.Update(employee);
            _UnitOfWork.Complete();
        }

        public void UpdateProcedureTypePhoto(MediafileViewModel mediaFileModel, int id)
        {
            MediaFile mediaFileEntity = AutoMappers<MediafileViewModel, MediaFile>.Map(mediaFileModel);
            var procedureType = _UnitOfWork.ProcedureType.GetById(id);
            var previousPhoto = procedureType.MediaFile;
            _UnitOfWork.MediaFile.Delete(previousPhoto);
            _UnitOfWork.MediaFile.Add(mediaFileEntity);
            procedureType.MediaFile = mediaFileEntity;
            _UnitOfWork.Complete();
        }

        public void AddProcedureTypePhoto(MediafileViewModel mediaFile, int id)
        {
            MediaFile mediafileEntity = AutoMappers<MediafileViewModel, MediaFile>.Map(mediaFile);
            var procedureType = _UnitOfWork.ProcedureType.GetById(id);
            _UnitOfWork.MediaFile.Add(mediafileEntity);
            procedureType.MediaFile = mediafileEntity;
            _UnitOfWork.Complete();
        }

        public void AddMediaFile(MediafileViewModel mediaFile, int id, string type)
        {
            MediaFile mediafileEntity = AutoMappers<MediafileViewModel, MediaFile>.Map(mediaFile);
            if(type == "promo")
            {
                mediafileEntity.IsPromoPhoto = true;
            }
            else
            {
                mediafileEntity.IsEmployeePhoto = true;
            }
            Employee employee = _UnitOfWork.Employee.GetById(id);
            mediafileEntity.Employee = employee;
            _UnitOfWork.MediaFile.Add(mediafileEntity);
            
            _UnitOfWork.Complete();
        }
    }
}
