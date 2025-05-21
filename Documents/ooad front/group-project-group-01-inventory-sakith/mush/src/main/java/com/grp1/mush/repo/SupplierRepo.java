package com.grp1.mush.repo;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.grp1.mush.model.Supplier;

@Repository
public interface SupplierRepo extends JpaRepository<Supplier, Long> {
}
